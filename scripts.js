let calendar;

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  fetch("api/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("loginResult").innerText = data.message;
      if (data.message === "Login successful.") {
        document.getElementById("auth").style.display = "none";
        document.getElementById("calculator").style.display = "block";
        loadCalendar();
      }
    });
}

function register() {
  const username = document.getElementById("registerUsername").value;
  const password = document.getElementById("registerPassword").value;

  fetch("api/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("registerResult").innerText = data.message;
    });
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";

  if (tabName === "Calendar") {
    calendar.render();
  }
}

function calculateHourlyIncome() {
  const hourlyRate = parseFloat(document.getElementById("hourlyRate").value);
  const workedHours = parseFloat(document.getElementById("workedHours").value);
  const normalHours = parseFloat(document.getElementById("normalHours").value);
  const hourlyDate = document.getElementById("hourlyDate").value;

  let income;
  if (workedHours <= normalHours) {
    income = hourlyRate * workedHours;
  } else {
    income =
      hourlyRate * normalHours + (workedHours - normalHours) * hourlyRate * 1.5;
  }

  document.getElementById(
    "hourlyResult"
  ).innerText = `Доход за ${hourlyDate}: $${income.toFixed(2)}`;
  addIncomeToCalendar(hourlyDate, income);
}

function calculateTaskIncome() {
  const taskHourlyRate = parseFloat(
    document.getElementById("taskHourlyRate").value
  );
  const taskCount = parseInt(document.getElementById("taskCount").value, 10);
  const taskRateAbove8 = parseFloat(
    document.getElementById("taskRateAbove8").value
  );
  const coefficient = parseFloat(document.getElementById("coefficient").value);
  const taskDate = document.getElementById("taskDate").value;

  let income;
  if (taskCount <= 8) {
    income = taskHourlyRate * taskCount;
  } else {
    income =
      taskHourlyRate * 8 + (taskCount - 8) * taskRateAbove8 * coefficient;
  }

  document.getElementById(
    "taskResult"
  ).innerText = `Доход за ${taskDate}: $${income.toFixed(2)}`;
  addIncomeToCalendar(taskDate, income);
}

function calculateBonus() {
  const monthlyIncome = parseFloat(
    document.getElementById("monthlyIncome").value
  );
  const qaScore = parseFloat(document.getElementById("qaScore").value);
  const holidayDays = parseInt(
    document.getElementById("holidayDays").value,
    10
  );
  const hourlyRateBonus = parseFloat(
    document.getElementById("hourlyRateBonus").value
  );

  const bonusPercentage = qaScore / 30;
  const bonus = monthlyIncome * bonusPercentage;
  const holidayPay = holidayDays * 8 * hourlyRateBonus;

  const totalIncome = monthlyIncome + bonus + holidayPay;

  document.getElementById("bonusResult").innerText = `Бонус: $${bonus.toFixed(
    2
  )}`;
  document.getElementById(
    "totalIncomeResult"
  ).innerText = `Общий доход: $${totalIncome.toFixed(2)}`;
}

function calculateRequiredHours() {
  const targetIncome = parseFloat(
    document.getElementById("targetIncome").value
  );
  const hourlyRateRequired = parseFloat(
    document.getElementById("hourlyRateRequired").value
  );
  const normalHoursRequired = parseFloat(
    document.getElementById("normalHoursRequired").value
  );
  const totalShiftsRequired = parseInt(
    document.getElementById("totalShiftsRequired").value,
    10
  );

  const requiredHours =
    targetIncome /
    (hourlyRateRequired * normalHoursRequired * totalShiftsRequired);

  document.getElementById(
    "requiredHoursResult"
  ).innerText = `Необходимые часы: ${requiredHours.toFixed(2)}`;
}

function calculateRequiredTasks() {
  const targetIncome = parseFloat(
    document.getElementById("targetIncome").value
  );
  const hourlyRateTasksRequired = parseFloat(
    document.getElementById("hourlyRateTasksRequired").value
  );
  const taskRateAbove8Required = parseFloat(
    document.getElementById("taskRateAbove8Required").value
  );
  const coefficientRequired = parseFloat(
    document.getElementById("coefficientRequired").value
  );
  const totalShiftsTasksRequired = parseInt(
    document.getElementById("totalShiftsTasksRequired").value,
    10
  );

  const requiredTasks =
    targetIncome /
    ((hourlyRateTasksRequired * 8 +
      taskRateAbove8Required * coefficientRequired) *
      totalShiftsTasksRequired);

  document.getElementById(
    "requiredTasksResult"
  ).innerText = `Необходимые задачи: ${requiredTasks.toFixed(2)}`;
}

function calculateNetIncome() {
  const totalIncome = parseFloat(document.getElementById("totalIncome").value);
  const esv = parseFloat(document.getElementById("esv").value);
  const exchangeRate = parseFloat(
    document.getElementById("exchangeRate").value
  );

  const netIncome = totalIncome - esv;
  const netIncomeInUAH = netIncome * exchangeRate;

  document.getElementById(
    "netIncomeResult"
  ).innerText = `Чистый доход: $${netIncome.toFixed(2)}`;
  document.getElementById(
    "netIncomeInUAHResult"
  ).innerText = `Чистый доход в гривнах: ₴${netIncomeInUAH.toFixed(2)}`;
}

function addIncomeToCalendar(date, income) {
  calendar.addEvent({
    title: `$${income.toFixed(2)}`,
    start: date,
  });
}

function loadCalendar() {
  calendar = new FullCalendar.Calendar(document.getElementById("calendar"), {
    plugins: ["dayGrid"],
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,dayGridWeek,dayGridDay",
    },
    events: [],
  });
  calendar.render();
}
