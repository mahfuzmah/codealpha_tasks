function calculateAge() {
  const dobInput = document.getElementById('dob').value;
  const resultDiv = document.getElementById('result');
  resultDiv.classList.remove('show');
  resultDiv.textContent = "";

  if (!dobInput) {
    resultDiv.textContent = "Please select your date of birth.";
    setTimeout(() => resultDiv.classList.add('show'), 10);
    return;
  }

  const dob = new Date(dobInput);
  const today = new Date();
  if (dob > today) {
    resultDiv.textContent = "Date of birth cannot be in the future.";
    setTimeout(() => resultDiv.classList.add('show'), 10);
    return;
  }

  let years = today.getFullYear() - dob.getFullYear();
  let months = today.getMonth() - dob.getMonth();
  let days = today.getDate() - dob.getDate();
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  resultDiv.textContent = `You are ${years} years, ${months} months, and ${days} days old.`;
  setTimeout(() => resultDiv.classList.add('show'), 10);
}
