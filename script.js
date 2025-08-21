const formFields = ["name", "email", "phone", "summary"];
formFields.forEach(id => {
  document.getElementById(id).addEventListener("input", updatePreview);
});

document.querySelectorAll("#skillsContainer input").forEach(checkbox => {
  checkbox.addEventListener("change", updatePreview);
});

function addEducation() {
  const container = document.getElementById("educationContainer");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "education";
  input.placeholder = "e.g. M.Tech in IT, 2027";
  input.addEventListener("input", updatePreview);
  container.appendChild(input);
}

function addExperience() {
  const container = document.getElementById("experienceContainer");
  const input = document.createElement("input");
  input.type = "text";
  input.className = "experience";
  input.placeholder = "e.g. Software Engineer - XYZ Ltd.";
  input.addEventListener("input", updatePreview);
  container.appendChild(input);
}

function updatePreview() {
  // Basic Info
  document.getElementById("pName").innerText = document.getElementById("name").value || "Your Name";
  document.getElementById("pEmail").innerText = document.getElementById("email").value || "your@email.com";
  document.getElementById("pPhone").innerText = document.getElementById("phone").value || "1234567890";
  document.getElementById("pSummary").innerText = document.getElementById("summary").value || "Your summary will appear here...";

  // Education
  const eduInputs = document.querySelectorAll(".education");
  const pEdu = document.getElementById("pEducation");
  pEdu.innerHTML = "";
  eduInputs.forEach(e => {
    if (e.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = e.value;
      pEdu.appendChild(li);
    }
  });
  if (pEdu.innerHTML === "") pEdu.innerHTML = "<li>Your education will appear here...</li>";

  // Experience
  const expInputs = document.querySelectorAll(".experience");
  const pExp = document.getElementById("pExperience");
  pExp.innerHTML = "";
  expInputs.forEach(e => {
    if (e.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = e.value;
      pExp.appendChild(li);
    }
  });
  if (pExp.innerHTML === "") pExp.innerHTML = "<li>Your experience will appear here...</li>";

  // Skills
  const checkedSkills = Array.from(document.querySelectorAll("#skillsContainer input:checked")).map(cb => cb.value);
  const pSkills = document.getElementById("pSkills");
  pSkills.innerHTML = "";
  if (checkedSkills.length === 0) {
    pSkills.innerHTML = "<li>Your skills will appear here...</li>";
  } else {
    checkedSkills.forEach(skill => {
      const li = document.createElement("li");
      li.textContent = skill;
      pSkills.appendChild(li);
    });
  }

  updateProgressBar();
}

function clearForm() {
  formFields.forEach(id => document.getElementById(id).value = "");
  document.querySelectorAll(".education").forEach((e, i) => { if(i>0) e.remove(); else e.value=""; });
  document.querySelectorAll(".experience").forEach((e, i) => { if(i>0) e.remove(); else e.value=""; });
  document.querySelectorAll("#skillsContainer input").forEach(cb => cb.checked = false);
  updatePreview();
}

function updateProgressBar() {
  let filled = 0;
  let total = formFields.length + 2; // education + experience
  formFields.forEach(id => { if (document.getElementById(id).value.trim() !== "") filled++; });
  if (document.querySelector(".education").value.trim() !== "") filled++;
  if (document.querySelector(".experience").value.trim() !== "") filled++;
  const percent = (filled / total) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
}

function downloadPDF() {
  const { jsPDF } = window.jspdf;
  const resume = document.getElementById("resumePreview");

  html2canvas(resume, { scale: 2, backgroundColor: "#fff" }).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20; // margin
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save("resume.pdf");
  });
}
