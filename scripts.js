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
}

function calculateHourlyIncome() {
  var hourlyRate = parseFloat(document.getElementById("hourlyRate").value);
  var workedHours = parseFloat(document.getElementById("workedHours").value);
  var normalHours = parseFloat(document.getElementById("normalHours").value);
  var date = document.getElementById("hourlyDate").value;
  var result = 0;

  if (workedHours > normalHours) {
    var normalPayment = normalHours * hourlyRate;
    var overtimePayment = (workedHours - normalHours) * hourlyRate * 1.5;
    result = normalPayment + overtimePayment;
  } else {
    result = workedHours * hourlyRate;
  }

  document.getElementById(
    "hourlyResult"
  ).innerText = `Доход за ${date}: $${result.toFixed(2)}`;

  fetch("/save_hourly_income", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hourlyRate: hourlyRate,
      workedHours: workedHours,
      normalHours: normalHours,
      date: date,
      result: result,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function calculateTaskIncome() {
  var hourlyRate = parseFloat(document.getElementById("taskHourlyRate").value);
  var taskCount = parseInt(document.getElementById("taskCount").value);
  var taskRateAbove8 = parseFloat(
    document.getElementById("taskRateAbove8").value
  );
  var coefficient = parseFloat(document.getElementById("coefficient").value);
  var date = document.getElementById("taskDate").value;
  var result = 0;

  if (taskCount > 8) {
    var additionalTasks = taskCount - 8;
    var additionalPayment = additionalTasks * taskRateAbove8;
    result = 8 * hourlyRate * coefficient + additionalPayment;
  } else {
    result = taskCount * hourlyRate * coefficient;
  }

  document.getElementById(
    "taskResult"
  ).innerText = `Доход за ${date}: $${result.toFixed(2)}`;

  fetch("/save_task_income", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hourlyRate: hourlyRate,
      taskCount: taskCount,
      taskRateAbove8: taskRateAbove8,
      coefficient: coefficient,
      date: date,
      result: result,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function calculateBonus() {
  var monthlyIncome = parseFloat(
    document.getElementById("monthlyIncome").value
  );
  var qaScore = parseInt(document.getElementById("qaScore").value);
  var holidayDays = parseInt(document.getElementById("holidayDays").value);
  var hourlyRate = parseFloat(document.getElementById("hourlyRateBonus").value);
  var bonusCoefficient = 0;

  if (qaScore >= 30) {
    bonusCoefficient = 1.5;
  } else if (qaScore == 29) {
    bonusCoefficient = 1.3;
  } else if (qaScore == 28) {
    bonusCoefficient = 1.2;
  } else if (qaScore == 27) {
    bonusCoefficient = 1.0;
  }

  var holidayBonus = holidayDays * hourlyRate * 8;
  var bonus = 0.3 * monthlyIncome * bonusCoefficient - 0.3 * monthlyIncome;
  var totalIncome = monthlyIncome + bonus + holidayBonus;

  document.getElementById("bonusResult").innerText = `Бонус: $${bonus.toFixed(
    2
  )} (включая ${holidayBonus.toFixed(2)} за ${holidayDays} праздничных дней)`;
  document.getElementById(
    "totalIncomeResult"
  ).innerText = `Суммарный доход: $${totalIncome.toFixed(2)}`;

  fetch("/save_bonus", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      monthlyIncome: monthlyIncome,
      qaScore: qaScore,
      holidayDays: holidayDays,
      hourlyRate: hourlyRate,
      bonus: bonus,
      holidayBonus: holidayBonus,
      totalIncome: totalIncome,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function calculateNetIncome() {
  var totalIncome = parseFloat(document.getElementById("totalIncome").value);
  var esv = parseFloat(document.getElementById("esv").value);
  var exchangeRate = parseFloat(document.getElementById("exchangeRate").value);
  var tax = 0.05 * totalIncome;
  var netIncome = totalIncome - tax - esv;
  var netIncomeInUAH = netIncome * exchangeRate;

  document.getElementById(
    "netIncomeResult"
  ).innerText = `Чистий прибуток: $${netIncome.toFixed(2)}`;
  document.getElementById(
    "netIncomeInUAHResult"
  ).innerText = `Чистий прибуток в гривнах: ₴${netIncomeInUAH.toFixed(2)}`;
}

function calculateRequiredHours() {
  var targetIncome = parseFloat(document.getElementById("targetIncome").value);
  var hourlyRate = parseFloat(
    document.getElementById("hourlyRateRequired").value
  );
  var normalHours = parseFloat(
    document.getElementById("normalHoursRequired").value
  );
  var totalShifts = parseInt(
    document.getElementById("totalShiftsRequired").value
  );

  var totalRequiredHours = targetIncome / hourlyRate;
  var dailyRequiredHours = totalRequiredHours / totalShifts;

  var requiredDailyHours;
  if (dailyRequiredHours > normalHours) {
    var overtimeHours = dailyRequiredHours - normalHours;
    requiredDailyHours = normalHours + overtimeHours / 1.5;
  } else {
    requiredDailyHours = dailyRequiredHours;
  }

  document.getElementById(
    "requiredHoursResult"
  ).innerText = `Вам потрібно працювати ${requiredDailyHours.toFixed(
    2
  )} годин на день для досягнення доходу ${targetIncome.toFixed(2)}$.`;
}

function calculateRequiredTasks() {
  var targetIncome = parseFloat(document.getElementById("targetIncome").value);
  var hourlyRate = parseFloat(
    document.getElementById("hourlyRateTasksRequired").value
  );
  var taskRateAbove8 = parseFloat(
    document.getElementById("taskRateAbove8Required").value
  );
  var coefficient = parseFloat(
    document.getElementById("coefficientRequired").value
  );
  var totalShifts = parseInt(
    document.getElementById("totalShiftsTasksRequired").value
  );

  var baseIncome = 8 * hourlyRate * coefficient;
  var requiredTasks;

  if (baseIncome >= targetIncome) {
    requiredTasks = targetIncome / (hourlyRate * coefficient);
  } else {
    var additionalIncome = targetIncome - baseIncome;
    var additionalTasks = additionalIncome / taskRateAbove8;
    requiredTasks = 8 + additionalTasks;
  }

  var dailyRequiredTasks = requiredTasks / totalShifts;

  document.getElementById(
    "requiredTasksResult"
  ).innerText = `Вам потрібно виконувати ${dailyRequiredTasks.toFixed(
    2
  )} тасків на день для досягнення доходу ${targetIncome.toFixed(2)}$.`;
}

// Default to open the first tab
document.addEventListener("DOMContentLoaded", function () {
  document.querySelector(".tablinks").click();
});
