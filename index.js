//posting dates
let postDate1 = document.getElementById('postDate1');
let postDate2 = document.getElementById('postDate2');
let postDate3 = document.getElementById('postDate3');
let postDate4 = document.getElementById('postDate4');
let postDate5 = document.getElementById('postDate5');
let postDate6 = document.getElementById('postDate6');

let postMonth = document.getElementById('postMonth')




let count = 0 ;
const tableList = document.getElementById('tableList');

fetch('https://nursing-backend.vercel.app/data').then(
    res => {
        console.log(res.status);
        return res.json()
    }
).then(
    data => {
        console.log(data);
      
      


for (let index = 0; index < data.students.length; index++) {

    //name list and posts
    count = count + 1 ;
    tableList.innerHTML += `<tr>
                <td>${count}</td>
                <td>${data.students[index].name}</td>
                <td>${data.students[index].post1}</td>
                <td>${data.students[index].post2}</td>
                <td>${data.students[index].post3}</td>
                <td>${data.students[index].post4}</td>
                <td>${data.students[index].post5}</td>
                <td>${data.students[index].post6}</td>
            </tr>`;


}


    }
).catch(
    err => {
        console.error('Error:', err);
    }
);






fetch('https://nursing-backend.vercel.app/configdata').then(
    response => {
        console.log(response.status);
        return response.json();
    }
).then(
    data => {
        console.log(data);
      
        //postdates
        postDate1.innerHTML = `${data.postings[0].post1[0].start} to ${data.postings[0].post1[0].end}`;
        postDate2.innerHTML = `${data.postings[0].post1[0].start} to ${data.postings[0].post2[0].end}`;
        postDate3.innerHTML = `${data.postings[0].post1[0].start} to ${data.postings[0].post3[0].end}`;
        postDate4.innerHTML = `${data.postings[0].post1[0].start} to ${data.postings[0].post4[0].end}`;
        postDate5.innerHTML = `${data.postings[0].post1[0].start} to ${data.postings[0].post5[0].end}`;
        postDate6.innerHTML = `${data.postings[0].post1[0].start} to ${data.postings[0].post6[0].end}`;

        postMonth.innerHTML =`II YEAR - CLINICAL POSTING: MONTH OF ${data.month.toUpperCase()}-2024`

    }
).catch(
    err => {
        console.error('Error:', err);
    }
);

