document.addEventListener('DOMContentLoaded', () => {
    const studentContainer = document.getElementById('student-container');
    const apiEndpointStudents = 'https://nursing-backend.vercel.app/data';
    const apiEndpointConfig = 'https://nursing-backend.vercel.app/configdata';
    const apiEndpointSubmit = 'https://nursing-backend.vercel.app/submit';  // Replace with your actual endpoint

    async function fetchData() {
        try {
            const [studentsResponse, configResponse] = await Promise.all([
                fetch(apiEndpointStudents),
                fetch(apiEndpointConfig)
            ]);

            const studentsData = await studentsResponse.json();
            const configData = await configResponse.json();

            createStudentCards(studentsData.students, configData.allposting);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function createStudentCards(students, postings) {
        studentContainer.innerHTML = '';

        students.forEach(student => {
            const studentCard = document.createElement('div');
            studentCard.className = 'studentcard';

            const studentName = document.createElement('h2');
            studentName.textContent = student;
            studentCard.appendChild(studentName);

            const studentPostDiv = document.createElement('div');
            studentPostDiv.className = 'Studentpost';

            for (let i = 1; i <= 6; i++) {
                const label = document.createElement('label');
                label.textContent = `post${i}`;

                const select = document.createElement('select');
                select.className = `post${i}`;
                select.innerHTML = `<option value="">Select post${i}</option>`;
                
                postings.forEach(post => {
                    select.innerHTML += `<option value="${post}">${post}</option>`;
                });

                studentPostDiv.appendChild(label);
                studentPostDiv.appendChild(select);
            }

            studentCard.appendChild(studentPostDiv);
            studentContainer.appendChild(studentCard);
        });
    }

    async function submitData() {
        const students = [];

        const studentCards = document.querySelectorAll('.studentcard');
        studentCards.forEach(card => {
            const student = { name: card.querySelector('h2').textContent };
            
            for (let i = 1; i <= 6; i++) {
                const select = card.querySelector(`.post${i}`);
                student[`post${i}`] = select.value;
            }

            students.push(student);
        });

        try {
            const response = await fetch(apiEndpointSubmit, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ students })
            });

            if (response.ok) {
                console.log('Data submitted successfully');
            } else {
                console.error('Error submitting data:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting data:', error);
        }
    }

    document.getElementById('submit-button').addEventListener('click', submitData);

    fetchData();
});
