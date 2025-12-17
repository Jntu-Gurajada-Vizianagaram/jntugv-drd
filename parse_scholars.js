const fs = require('fs');

const raw = fs.readFileSync('raw_scholars.txt', 'utf8');

// The format seems to be:
// S.NO Roll Number Research Scholar Name FT/PT Department Supervisor Name Co-Supervisor Name
// Example:
// 1 22022P0101 R Bala Murali Krishna PT Civil Engineering Dr.P.Markandeya Raju Dr.V.Ravindra

// Regex explanation:
// (\d+) : S.No (group 1)
// \s+
// ([A-Z0-9]+) : Roll Number (group 2)
// \s+
// (.+?) : Name (group 3) - lazy match until FT/PT
// \s+
// (PT|FT) : FT/PT (group 4)
// \s+
// (.+?) : Department (group 5) - lazy match until Supervisor
// \s+
// (Dr\.[^\d]+?) : Supervisor (group 6) - assumes starts with Dr.
// \s+
// (Dr\..+|&#[0-9]+;.*|—+) : Co-Supervisor (group 7) - strict check might fail, let's try to be smart

// The issue is distinguishing Department from Supervisor if Supervisor doesn't always have a standard prefix, 
// OR distinguishing Name from FT/PT (easy), 
// OR distinguishing Supervisor from Co-Supervisor.

// Let's use a split approach based on the S.No which is distinct integers roughly.
// But some data has typos or irregular spaces.

const tokens = raw.split(/\s+/);
// This split is too aggressive because names have spaces.

// Better strategy: Find all starts of rows. A row starts with a number, then a roll number.
// Roll numbers generally look like \d+[A-Z]+\d+ or similar.
// 22022P0101, 19022PMET01

// Regex to identify the start of a record:
// \b(\d+)\s+([0-9]+[A-Z]+[0-9]+[A-Z0-9]*)\b
const pattern = /(\d+)\s+([0-9]+[A-Z]+[0-9]+[A-Z0-9]*)\s+(.+?)\s+(PT|FT)\s+(.+?)\s+(Dr\.?[\s\S]+?)\s+(Dr\.?[\s\S]+?|&#8212;[\s\S]*?|—[\s\S]*?)(?=\s+\d+\s+[0-9]+[A-Z]+|$)/g;

// Wait, the "Supervisor" and "Co-Supervisor" split is hard purely by regex if name patterns vary.
// Let's look at the delimiters.
// Supervisor starts with "Dr" usually.
// Co-supervisor starts with "Dr" or consists of special dash characters.

// Let's iterate manually finding the "S.No Roll" pattern.

const entries = [];
const regexStart = /(\d+)\s+([0-9]+[A-Z]+[0-9]+[A-Z0-9]*)\s+/g;

let match;
const starts = [];
while ((match = regexStart.exec(raw)) !== null) {
    starts.push({
        index: match.index,
        sno: match[1],
        roll: match[2],
        endOfMatch: match.index + match[0].length
    });
}

// Now verify we have 81 entries
console.log(`Found ${starts.length} entries`);

for (let i = 0; i < starts.length; i++) {
    const current = starts[i];
    const next = starts[i + 1];

    // exact text for this entry
    const startIdx = current.endOfMatch;
    const endIdx = next ? next.index : raw.length;

    let content = raw.substring(startIdx, endIdx).trim();

    // Content contains: Name FT/PT Dept Supervisor Co-Supervisor

    // 1. extract FT/PT
    const ftptMatch = content.match(/\s+(PT|FT)\s+/);
    if (!ftptMatch) {
        console.error(`Failed to find FT/PT for ${current.sno}`);
        continue;
    }

    const ftptIndex = ftptMatch.index;
    const name = content.substring(0, ftptIndex).trim();
    const type = ftptMatch[1];

    let remainder = content.substring(ftptIndex + ftptMatch[0].length).trim();

    // Remainder: Dept Supervisor Co-Supervisor
    // Department is tricky. "Civil Engineering", "Computer Science & Engineering"
    // Supervisor usually starts with "Dr." or "Dr "

    // Let's look for "Dr"
    const drIndex = remainder.search(/Dr/);
    if (drIndex === -1) {
        console.error(`Failed to find Dr for ${current.sno}: ${remainder}`);
        // Fallback or specific fix?
        // Some might not have Dr? 
        // 54: Dr. Attada...
        // 56: Dr Challa...
        // 57: Dr Pendela
        continue;
    }

    const dept = remainder.substring(0, drIndex).trim();
    let supervisors = remainder.substring(drIndex).trim();

    // Supervisors string: "Dr.P.Markandeya Raju Dr.V.Ravindra"
    // or "Dr.P Subba Rao &#8212;&#8212;-"

    // We need to split Supervisor and Co-Supervisor used `Dr` or the dashes.
    // Be careful splitting on the first "Dr" (which is the start).
    // We want the *second* "Dr" or the dash part.

    // Find second occurrence of "Dr"
    // Or find "Dr" or special chars.

    // Regex for the second supervisor:
    // It seems they are separated by space.
    // "Dr.Name Name Dr.Name Name"
    // "Dr.Name Name &#8212;-"

    // Let's try to match the LAST token if it looks like dashes?
    // Or find the index of "Dr" or "Dr." or "&" after the beginning.

    let splitIdx = -1;
    // Look for " Dr" or " Dr." or " &" (for &8212)
    // We need to skip the first "Dr" at index 0.

    // Try to find " Dr" starting from index 1
    const secondDr = supervisors.indexOf(" Dr", 1);
    const dashMatch = supervisors.indexOf(" &#", 1);
    const dashMatch2 = supervisors.indexOf(" —", 1); // em dash if parsed

    if (secondDr !== -1) {
        splitIdx = secondDr;
    } else if (dashMatch !== -1) {
        splitIdx = dashMatch;
    } else if (dashMatch2 !== -1) {
        splitIdx = dashMatch2;
    }

    let supervisor = "";
    let coSupervisor = "";

    if (splitIdx !== -1) {
        supervisor = supervisors.substring(0, splitIdx).trim();
        coSupervisor = supervisors.substring(splitIdx).trim();
    } else {
        // Assume one supervisor? Or maybe the parser failed.
        // Check identifying chars
        supervisor = supervisors;
        coSupervisor = "-";
    }

    // Clean up HTML entities
    coSupervisor = coSupervisor.replace(/&#8212;+/g, "-").replace(/&#8211;+/g, "-").replace(/—+/g, "-");
    if (coSupervisor.match(/^-+$/)) coSupervisor = "-";

    entries.push({
        sno: current.sno,
        roll: current.roll,
        name: name,
        type: type,
        dept: dept,
        supervisor: supervisor,
        coSupervisor: coSupervisor
    });
}

console.log(JSON.stringify(entries, null, 2));
