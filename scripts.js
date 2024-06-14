function calculateHourlyIncome() {
  const hourlyRate = parseFloat(document.getElementById("hourlyRate").value);
  const workedHours = parseFloat(document.getElementById("workedHours").value);
  const normalHours = parseFloat(document.getElementById("normalHours").value);

  let income;

  if (workedHours <= normalHours) {
    income = hourlyRate * workedHours;
  } else {
    const overtimeHours = workedHours - normalHours;
    income = normalHours * hourlyRate + overtimeHours * hourlyRate * 1.5;
  }

  document.getElementById(
    "hourlyResult"
  ).innerText = `Доход за часы: $${income.toFixed(2)}`;
}

function calculateTaskIncome() {
  const taskHourlyRate = parseFloat(
    document.getElementById("taskHourlyRate").value
  );
  const taskCount = parseInt(document.getElementById("taskCount").value);
  const taskRateAbove8 = parseFloat(
    document.getElementById("taskRateAbove8").value
  );
  const coefficient = parseFloat(document.getElementById("coefficient").value);

  let income;

  if (taskCount <= 8) {
    income = taskHourlyRate * taskCount * coefficient;
  } else {
    const additionalTasks = taskCount - 8;
    income =
      taskHourlyRate * 8 * coefficient + additionalTasks * taskRateAbove8;
  }

  document.getElementById(
    "taskResult"
  ).innerText = `Доход за задачи: $${income.toFixed(2)}`;
}

function calculateBonus() {
  const monthlyIncome = parseFloat(
    document.getElementById("monthlyIncome").value
  );
  const qaScore = parseInt(document.getElementById("qaScore").value);
  const holidayDays = parseInt(document.getElementById("holidayDays").value);
  const hourlyRateBonus = parseFloat(
    document.getElementById("hourlyRateBonus").value
  );

  let bonusCoefficient;

  if (qaScore >= 30) {
    bonusCoefficient = 1.5;
  } else if (qaScore === 29) {
    bonusCoefficient = 1.3;
  } else if (qaScore === 28) {
    bonusCoefficient = 1.2;
  } else if (qaScore === 27) {
    bonusCoefficient = 1.0;
  } else {
    bonusCoefficient = 0;
  }

  const thirtyPercent = 0.3 * monthlyIncome;
  const bonus = thirtyPercent * bonusCoefficient - thirtyPercent;
  const holidayBonus = holidayDays * (hourlyRateBonus * 8);
  const totalIncome = monthlyIncome + bonus + holidayBonus;

  document.getElementById(
    "bonusResult"
  ).innerText = `Бонус QA: $${bonus.toFixed(2)}`;
  document.getElementById(
    "totalIncomeResult"
  ).innerText = `Итоговый доход с бонусами: $${totalIncome.toFixed(2)}`;
}

function togglePaymentType() {
  const paymentType = document.getElementById("paymentType").value;
  if (paymentType === "hourly") {
    document.getElementById("hourlyPayDiv").style.display = "block";
    document.getElementById("taskPayDiv").style.display = "none";
  } else if (paymentType === "task") {
    document.getElementById("hourlyPayDiv").style.display = "none";
    document.getElementById("taskPayDiv").style.display = "block";
  }
}

function toggleTotalIncomePeriod() {
  const period = document.getElementById("totalIncomePeriod").value;
  if (period === "day") {
    document.getElementById("incomeMonth").style.display = "none";
    document.getElementById("incomeDayOrWeek").style.display = "block";
  } else if (period === "week") {
    document.getElementById("incomeMonth").style.display = "block";
    document.getElementById("incomeDayOrWeek").style.display = "block";
  } else if (period === "month") {
    document.getElementById("incomeMonth").style.display = "block";
    document.getElementById("incomeDayOrWeek").style.display = "none";
  }
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
}

function calculateTotalIncome() {
  const period = document.getElementById("totalIncomePeriod").value;
  const year = parseInt(document.getElementById("incomeYear").value);
  const month = parseInt(document.getElementById("incomeMonth").value);
  const dayOrWeek = parseInt(document.getElementById("incomeDayOrWeek").value);

  // Here you can add your logic to calculate total income for the specified period
  // For simplicity, we'll just display the entered values

  let resultText = `Год: ${year}`;
  if (period === "month") {
    resultText += `, Месяц: ${month}`;
  } else if (period === "day" || period === "week") {
    resultText += `, Месяц: ${month}, День/Неделя: ${dayOrWeek}`;
  }

  document.getElementById(
    "totalIncomeResult"
  ).innerText = `Результаты: ${resultText}`;
}
