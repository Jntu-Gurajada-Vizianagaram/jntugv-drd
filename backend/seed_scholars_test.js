const db = require('./config/db');
const axios = require('axios'); // We can't easy import TS files in Node, so I'll just copy a few or try to read it.
// Actually, I'll just copy the first 10 for now as a test, or I can read the file as text.

const scholarsData = [
    {
        "sno": "1",
        "roll": "22022P0101",
        "name": "R Bala Murali Krishna",
        "type": "PT",
        "dept": "Civil Engineering",
        "supervisor": "Dr.P.Markandeya Raju",
        "coSupervisor": "Dr.V.Ravindra"
    },
    {
        "sno": "2",
        "roll": "21022P0110",
        "name": "V Praveen",
        "type": "PT",
        "dept": "Civil Engineering",
        "supervisor": "Dr.P.Markandeya Raju",
        "coSupervisor": "Dr.G.Yesuratnam"
    },
    {
        "sno": "3",
        "roll": "19022P0119",
        "name": "Ch Giridhar Kumar",
        "type": "PT",
        "dept": "Civil Engineering",
        "supervisor": "Dr.P Subba Rao",
        "coSupervisor": "-"
    },
    {
        "sno": "4",
        "roll": "22022P0201",
        "name": "P Maheswara Rao",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.K.Srikumar",
        "coSupervisor": "-"
    },
    {
        "sno": "5",
        "roll": "22022P0202",
        "name": "T Karthik",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.V.S.Vakula",
        "coSupervisor": "-"
    },
    {
        "sno": "6",
        "roll": "21022P0213",
        "name": "T Amar Kiran",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.V.S.Vakula",
        "coSupervisor": "-"
    },
    {
        "sno": "7",
        "roll": "19022P0250",
        "name": "Sai Ganesh M",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.D.Vijaya Kumar",
        "coSupervisor": "Dr.V.S.Vakula"
    },
    {
        "sno": "8",
        "roll": "19022P0219",
        "name": "Anil Kumar P",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.P.Sekhar",
        "coSupervisor": "Dr.V.S.Vakula"
    },
    {
        "sno": "9",
        "roll": "19022P0210",
        "name": "R V L Narayan Divakar",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.G.Syam Naresh",
        "coSupervisor": "Dr.Y.S.Kishore Babu"
    },
    {
        "sno": "10",
        "roll": "19022P0246",
        "name": "Tammineni Sireesha",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.K.Srikumar",
        "coSupervisor": "Dr.A.Padmaja"
    },
    {
        "sno": "11",
        "roll": "19022P0230",
        "name": "P Sivakumar",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.V.S.Vakula",
        "coSupervisor": "-"
    },
    {
        "sno": "12",
        "roll": "18022P0213",
        "name": "P Karunakar",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.K.Srikumar",
        "coSupervisor": "-"
    },
    {
        "sno": "13",
        "roll": "15022P0216",
        "name": "K Swetha",
        "type": "PT",
        "dept": "Electrical & Electronics Engineering",
        "supervisor": "Dr.D.Vijaya Kumar",
        "coSupervisor": "Dr.V.S.Vakula"
    },
    {
        "sno": "14",
        "roll": "22022P0301",
        "name": "T Jagadeesh",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.C.L.V.R.S.V.Prasad",
        "coSupervisor": "Dr.G.Swami Naidu"
    },
    {
        "sno": "15",
        "roll": "22022P0302",
        "name": "D Nagaraju",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.S.Subrahmanyam Mendu",
        "coSupervisor": "Dr.C.Neelima Devi"
    },
    {
        "sno": "16",
        "roll": "21022P0337",
        "name": "P Aknath",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.P.Vijay Kumar",
        "coSupervisor": "Dr.C.Neelima Devi"
    },
    {
        "sno": "17",
        "roll": "21022P0336",
        "name": "A Sai sree Harsha",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.P.Jamaleswara Kumar",
        "coSupervisor": "Dr.K.Srinivasa Prasad"
    },
    {
        "sno": "18",
        "roll": "21022P0329",
        "name": "D Appanna",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.K.Srinivas Prasad",
        "coSupervisor": "Dr.G.Swami Naidu"
    },
    {
        "sno": "19",
        "roll": "21022P0328",
        "name": "Gowri Shankar Kaitha",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.C.Neelima Devi",
        "coSupervisor": "-"
    },
    {
        "sno": "20",
        "roll": "21022P0321",
        "name": "S Roopa",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.G.Swami Naidu",
        "coSupervisor": "-"
    },
    {
        "sno": "21",
        "roll": "21022P0309",
        "name": "A V S Gowtham",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.G.Swami Naidu",
        "coSupervisor": "-"
    },
    {
        "sno": "22",
        "roll": "21022P0302",
        "name": "V Gangadhar Praveen Ketha",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.C.Neelima Devi",
        "coSupervisor": "-"
    },
    {
        "sno": "23",
        "roll": "21022P0339",
        "name": "M Jayaprakash",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.K.Srinivas Prasad",
        "coSupervisor": "-"
    },
    {
        "sno": "24",
        "roll": "19022P0330",
        "name": "Abdul Khurshid",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.C.Neelima Devi",
        "coSupervisor": "Dr.G.Swami Naidu"
    },
    {
        "sno": "25",
        "roll": "120022P0329",
        "name": "Brahmananda Reddy Sathi",
        "type": "PT",
        "dept": "Mechanical Engineering",
        "supervisor": "Dr.N.Hari babu",
        "coSupervisor": "Dr.G.Swami Naidu"
    },
    {
        "sno": "26",
        "roll": "22022P0401",
        "name": "M Krishna Priya",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.K.Babulu",
        "coSupervisor": "Dr.M.Hema"
    },
    {
        "sno": "27",
        "roll": "22022P0402",
        "name": "B Priyanka",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.P.Satishh Rama Chowdary",
        "coSupervisor": "Dr.K.C.B.Rao"
    },
    {
        "sno": "28",
        "roll": "21022P0444",
        "name": "V Jeevan Kumar",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.B.Nalini",
        "coSupervisor": "-"
    },
    {
        "sno": "29",
        "roll": "21022P0422",
        "name": "V Vijaya Santhi",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.B.Nalini",
        "coSupervisor": "-"
    },
    {
        "sno": "30",
        "roll": "21022P0457",
        "name": "G Mani Kanta",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.A.Vamsee Krishna",
        "coSupervisor": "Dr.M.Nalini"
    },
    {
        "sno": "31",
        "roll": "19022P0408",
        "name": "T Venkata Rao",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.K.Babulu",
        "coSupervisor": "Dr.G.Appala Naidu"
    },
    {
        "sno": "32",
        "roll": "19022P0430",
        "name": "V Bharathi Devarakonda",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.K.Babulu",
        "coSupervisor": "Dr.M.Hema"
    },
    {
        "sno": "33",
        "roll": "15022P0406",
        "name": "B Sekhar",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.K.V.Ramanayya",
        "coSupervisor": "Dr.K.Babulu"
    },
    {
        "sno": "34",
        "roll": "15022P0477",
        "name": "Sagara Pandu",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.G.Manmadha Rao",
        "coSupervisor": "-"
    },
    {
        "sno": "35",
        "roll": "15022P0427",
        "name": "T Srinivasa Rao",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.Ch.Srinivasu",
        "coSupervisor": "Dr.K.Babulu"
    },
    {
        "sno": "36",
        "roll": "15022P0460",
        "name": "B Lakshmi",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.N.Kamaraju",
        "coSupervisor": "Dr.K.Babulu"
    },
    {
        "sno": "37",
        "roll": "14022P0442",
        "name": "P Bujji Babu",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.N.Kamaraju",
        "coSupervisor": "Dr.K.Babulu"
    },
    {
        "sno": "38",
        "roll": "13022P0411",
        "name": "V Prasanth",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.K.Babulu",
        "coSupervisor": "Dr.N.Kamaraju"
    },
    {
        "sno": "39",
        "roll": "13022P0403",
        "name": "K Himabindu",
        "type": "PT",
        "dept": "Electronics & Communication Engineering",
        "supervisor": "Dr.K.Babulu",
        "coSupervisor": "Dr.G.N.Swamy"
    },
    {
        "sno": "40",
        "roll": "22022P0501",
        "name": "N Sarath Kumar",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.R.Rajeswara Rao",
        "coSupervisor": "-"
    },
    {
        "sno": "41",
        "roll": "22022P0502",
        "name": "T Anil Kumar",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.R.Rajeswara Rao",
        "coSupervisor": "-"
    },
    {
        "sno": "42",
        "roll": "22022P0503",
        "name": "T Balaji",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "43",
        "roll": "22022P0504",
        "name": "B Usha Rani",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "44",
        "roll": "22022P0505",
        "name": "G Naveen",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr. Salina Adinarayana",
        "coSupervisor": "Dr.R.Rajeswara Rao"
    },
    {
        "sno": "45",
        "roll": "22022P0506",
        "name": "R Swetha",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr. Patchikolla Satish",
        "coSupervisor": "Dr.D.Rajyalakshmi"
    },
    {
        "sno": "46",
        "roll": "22022P0507",
        "name": "V Pranav",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.Golagani A V R C Rao",
        "coSupervisor": "Dr.G.Jayasuma"
    },
    {
        "sno": "47",
        "roll": "22022P0508",
        "name": "M Sharmila",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.Karimsetty Sujatha",
        "coSupervisor": "Dr.D.Rajyalakshmi"
    },
    {
        "sno": "48",
        "roll": "22022P0509",
        "name": "D Suneel",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.Adimalla Rama Rao",
        "coSupervisor": "Dr.B.Tirumala Rao"
    },
    {
        "sno": "49",
        "roll": "22022P0510",
        "name": "L Ramu",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.T.V.Madhusudhana Rao",
        "coSupervisor": "Dr.Ch.Bindu Madhuri"
    },
    {
        "sno": "50",
        "roll": "22022P0511",
        "name": "B Kishore Kumar",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.K.N.Brahmaji Rao",
        "coSupervisor": "Dr.Ch.Bindu Madhuri"
    },
    {
        "sno": "51",
        "roll": "22022P0512",
        "name": "B Srirama Durga Lakshmi",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.Ch.Ramesh",
        "coSupervisor": "Dr.Rajeswara Rao"
    },
    {
        "sno": "52",
        "roll": "22022P0513",
        "name": "G Gayatri",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.R.Sivaranjani",
        "coSupervisor": "Dr.D.Rajyalakshmi"
    },
    {
        "sno": "53",
        "roll": "22022P0514",
        "name": "N Ranga sree",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.Lakshmi Lydia",
        "coSupervisor": "Dr.P.Aruna Kumari"
    },
    {
        "sno": "54",
        "roll": "22022P0515",
        "name": "S Kalyan",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr. Attada Venkataramana",
        "coSupervisor": "Dr.P.Aruna Kumari"
    },
    {
        "sno": "55",
        "roll": "22022P0516",
        "name": "S Ratalu",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.P.Srinivasa Rao",
        "coSupervisor": "Dr.P.Aruna Kumari"
    },
    {
        "sno": "56",
        "roll": "22022P0517",
        "name": "M Kishore Babu",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr. Challa Narasimham",
        "coSupervisor": "Dr.R.Rajeswara Rao"
    },
    {
        "sno": "57",
        "roll": "22022P0518",
        "name": "G Lakshmana Rao",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr. Pendela Kanchnamala",
        "coSupervisor": "Dr.Ch.Bindu Madhuri"
    },
    {
        "sno": "58",
        "roll": "22022P0519",
        "name": "Khasimbee Shaik",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.K.V.Satyanarayana",
        "coSupervisor": "Dr.B.Tirumala Rao"
    },
    {
        "sno": "59",
        "roll": "22022P0520",
        "name": "S Sreenivasa Rao",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.M.Jayanthi Rao",
        "coSupervisor": "Dr.G.Jayasuma"
    },
    {
        "sno": "60",
        "roll": "21022P0502",
        "name": "Y Kumar Sekhar",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "61",
        "roll": "21022P0533",
        "name": "S Sree Latha",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.P.Satheesh",
        "coSupervisor": "Dr.Ch.Bindu Madhuri"
    },
    {
        "sno": "62",
        "roll": "21022P0534",
        "name": "P Rajya Lakshmi",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.P.Aruna Kumari",
        "coSupervisor": "-"
    },
    {
        "sno": "63",
        "roll": "21022P0547",
        "name": "Alamanda Sophia",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.B.Tirumala Rao",
        "coSupervisor": "-"
    },
    {
        "sno": "64",
        "roll": "21022P0557",
        "name": "D Muninder",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.P.Aruna Kumari",
        "coSupervisor": "-"
    },
    {
        "sno": "65",
        "roll": "21022P0535",
        "name": "Ch Lakshmi Bala",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "66",
        "roll": "21022P0564",
        "name": "Pukkalla Bharathi",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.K.Sujatha",
        "coSupervisor": "Dr.D.Rajyalakshmi"
    },
    {
        "sno": "67",
        "roll": "19022P0539",
        "name": "K Amruta Sagar",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.Pakkiluru Kiran Sree",
        "coSupervisor": "Dr.D.Rajyalakshmi"
    },
    {
        "sno": "68",
        "roll": "19022P0550",
        "name": "B Siva Jyothi",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.G.Neelima",
        "coSupervisor": "Dr.D.Rajyalakshmi"
    },
    {
        "sno": "69",
        "roll": "19022P0509",
        "name": "K Aravinda",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "70",
        "roll": "19022P0562",
        "name": "G Gowri Pushpa",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.K.Jayasri",
        "coSupervisor": "Dr.Ch.Bindu Madhuri"
    },
    {
        "sno": "71",
        "roll": "19022P0571",
        "name": "P S V Durga Gayatri",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.I Hemalatha",
        "coSupervisor": "Dr.Ch.Bindu Madhuri"
    },
    {
        "sno": "72",
        "roll": "19022P0510",
        "name": "K Swathi",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "73",
        "roll": "18022P0503",
        "name": "E Ramesh",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "74",
        "roll": "18022P0518",
        "name": "Kishan Chand Kopila",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajyalakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "75",
        "roll": "15022P0567",
        "name": "D Bhanu Mahesh",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.Ch.Bindu Madhuri",
        "coSupervisor": "Dr.D.Rajyalakshmi"
    },
    {
        "sno": "76",
        "roll": "15022P0552",
        "name": "Suma Hasan S",
        "type": "PT",
        "dept": "Computer Science & Engineering",
        "supervisor": "Dr.D.Rajya Lakshmi",
        "coSupervisor": "-"
    },
    {
        "sno": "77",
        "roll": "22022P1201",
        "name": "T Sivarama Krishna",
        "type": "PT",
        "dept": "Information technology",
        "supervisor": "Dr.G.Jayasuma",
        "coSupervisor": "-"
    },
    {
        "sno": "78",
        "roll": "22022P1202",
        "name": "N Durga Devi",
        "type": "PT",
        "dept": "Information technology",
        "supervisor": "Dr.B.Tirumala Rao",
        "coSupervisor": "-"
    },
    {
        "sno": "79",
        "roll": "19022PMET01",
        "name": "K Venkatesh",
        "type": "FT",
        "dept": "Metallurgical Engineering",
        "supervisor": "Dr.G.Swami Naidu",
        "coSupervisor": "-"
    },
    {
        "sno": "80",
        "roll": "22022P0MG01",
        "name": "Hafsa Quaraishi",
        "type": "PT",
        "dept": "Master of Business Administration",
        "supervisor": "Dr.T.Archan Acharya",
        "coSupervisor": "Dr.P.Sreedevi"
    }

];

async function seedScholars() {
    try {
        console.log("Starting scholars seed...");
        for (const s of scholarsData) {
            await db.execute(
                'INSERT INTO scholars (scholar_name, roll_number, department, supervisor_name, co_supervisor_name, admission_mode, admission_year) VALUES (?, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE scholar_name=VALUES(scholar_name)',
                [s.name, s.roll, s.dept, s.supervisor, s.coSupervisor, s.type === 'PT' ? 'Part-Time' : 'Full-Time', '2023']
            );
        }
        console.log("Seed completed.");
        process.exit(0);
    } catch (err) {
        console.error("Seed failed:", err.message);
        process.exit(1);
    }
}

seedScholars();
