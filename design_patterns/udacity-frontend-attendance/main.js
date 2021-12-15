let data_model = (function () {
    let days = 5;
    let students_name = ['ali', 'mohammad', 'reza', 'hossein'];
    let students_status = students_name.map(student_name => {
        let arr = []
        for (let d = 0; d < days; d++) {
            arr.push({
                name: student_name,
                day: d,
                attendance: Math.floor(Math.random() + 0.5)
            })
        }
        return arr;
    })

    return {
        days,
        students_name,
        students_status
    };
})();

let octupus = {
    getState: function () {
        return data_model
    },
    getPresentDays(student_name) {
        let sum = 0;
        data_model.students_status.forEach(function (item) {
            if (item[0].name === student_name) {

                sum = item.reduce(function (sum, item) {
                    return sum + parseInt(item.attendance);
                }, 0)
            }
        })
        return sum

    },
    changeAttendance: function (name, day, attendance) {

        data_model.students_status.forEach(function (item) {
            if (item[0].name === name) {
                item[day].attendance = parseInt(attendance);
            }
        })
        view.render();
    }


}

let view = {
    init: function () {
        this.tHead = document.querySelector('thead');
        this.tBody = document.querySelector('tbody');

        this.render();
    },
    render: function () {
        this.tHead.innerHTML = ''
        this.tBody.innerHTML = ''
        let {
            days,
            students_name,
            students_status
        } = octupus.getState();

        let {
            createThead,
            createTrow
        } = this.helperFunctions();

        createThead = createThead.bind(this);
        createTrow = createTrow.bind(this)




        createThead(days);

        students_status.forEach(function (student) {
            createTrow(student);
        })

    },


    helperFunctions: function () {
        let createThead = function (days) {
            let tr = document.createElement('tr');
            for (let i = 0; i < days; i++) {
                if (i === 0) {
                    let tdname = document.createElement('td');
                    tdname.innerText = 'student name';
                    tr.append(tdname)

                }
                let td = document.createElement('td');
                td.innerText = i + 1;
                tr.append(td);
            }
            this.tHead.append(tr)
        }

        let createTrow = function (studentState) {
            let tr = document.createElement('tr');
            for (let i = 0; i < studentState.length; i++) {
                let {
                    name,
                    day,
                    attendance
                } = studentState[i];

                let td = document.createElement('td');
                let input = document.createElement('input');
                input.setAttribute('type', 'checkbox');


                input.studentID = name;
                input.day = i;
                input.checked = attendance;

                input.addEventListener('change', function (event) {
                    let {
                        studentID,
                        day,
                        checked
                    } = event.target;

                    octupus.changeAttendance(studentID, day, +checked)
                })

                if (i === 0) {
                    let tdname = document.createElement('td');
                    tdname.innerText = name;
                    tr.append(tdname)
                }
                td.append(input);
                tr.append(td);

                if (i === studentState.length - 1) {
                    let tdattendance = document.createElement('td');
                    tdattendance.innerText = octupus.getPresentDays(name);
                    tr.append(tdattendance)
                }

            }
            this.tBody.append(tr);
        }
        return {
            createThead,
            createTrow
        }
    },


}

view.init();