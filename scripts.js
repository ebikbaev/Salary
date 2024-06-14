function updateForm() {
  const paymentType = document.getElementById("paymentType").value;
  document.getElementById("hourlyFields").style.display =
    paymentType === "hourly" ? "block" : "none";
  document.getElementById("taskFields").style.display =
    paymentType === "task" ? "block" : "none";
}

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
    "incomeResult"
  ).innerText = `You earned: $${income.toFixed(2)}`;
}

function calculateTaskIncome() {
  const taskHourlyRate = parseFloat(
    document.getElementById("taskHourlyRate").value
  );
  const taskCount = parseFloat(document.getElementById("taskCount").value);
  const taskRateAbove8 = parseFloat(
    document.getElementById("taskRateAbove8").value
  );
  const taskCoefficient = parseFloat(
    document.getElementById("taskCoefficient").value
  );

  let income;
  if (taskCount <= 8) {
    income = taskHourlyRate * taskCount * taskCoefficient;
  } else {
    const additionalTasks = taskCount - 8;
    income =
      taskHourlyRate * 8 * taskCoefficient + additionalTasks * taskRateAbove8;
  }

  document.getElementById(
    "incomeResult"
  ).innerText = `You earned: $${income.toFixed(2)}`;
}

function calculateBonus() {
  const monthlyIncome = parseFloat(
    document.getElementById("monthlyIncome").value
  );
  const qaScore = parseFloat(document.getElementById("qaScore").value);
  const holidayDays = parseFloat(document.getElementById("holidayDays").value);
  const bonusHourlyRate = parseFloat(
    document.getElementById("bonusHourlyRate").value
  );

  let bonusCoefficient;
  if (qaScore >= 30) {
    bonusCoefficient = 1.5;
  } else if (qaScore == 29) {
    bonusCoefficient = 1.3;
  } else if (qaScore == 28) {
    bonusCoefficient = 1.2;
  } else if (qaScore == 27) {
    bonusCoefficient = 1.0;
  } else {
    bonusCoefficient = 0;
  }

  const qaBonus = 0.3 * monthlyIncome * bonusCoefficient - 0.3 * monthlyIncome;
  const holidayBonus = holidayDays * (bonusHourlyRate / 30) * 2;
  const totalBonus = qaBonus + holidayBonus;

  document.getElementById(
    "bonusResult"
  ).innerText = `Bonus: $${totalBonus.toFixed(2)} (QA: $${qaBonus.toFixed(
    2
  )}, Holiday: $${holidayBonus.toFixed(2)})`;
}

function toggleBonus() {
  const bonusSection = document.getElementById("bonusSection");
  const showBonus = document.getElementById("showBonus").checked;

  if (showBonus) {
    bonusSection.style.display = "block";
  } else {
    bonusSection.style.display = "none";
  }
}

function changeTheme() {
  const theme = document.getElementById("theme").value;
  document.body.className = theme + "-theme";
}
