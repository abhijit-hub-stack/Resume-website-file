document.getElementById('resume-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collecting data from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const linkedin = document.getElementById('linkedin').value;
    const address = document.getElementById('address').value;
    const jobTitle = document.getElementById('job-title').value;
    const company = document.getElementById('company').value;
    const jobDescription = document.getElementById('job-description').value;
    const degree = document.getElementById('degree').value;
    const college = document.getElementById('college').value;
    const skills = document.getElementById('skills').value.split(',').map(skill => skill.trim());
    const certificate = document.getElementById('certificate').value.split(',').map(cert => cert.trim());

    // Creating resume output
    const resumeOutput = `
        <h2>${name}</h2>
        <hr>
        <div class="contact-info">
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
        </div>
        <p><strong>LinkedIn:</strong> <a href="${linkedin}" target="_blank">${linkedin}</a></p>
        <p><strong>Address:</strong> ${address}</p>
        <h4>Experience:</h4>
        <p><strong>${jobTitle}</strong> at ${company}</p>
        <p>${jobDescription}</p>
        <h4>Education:</h4>
        <p><strong>${degree}</strong> from ${college}</p>
        <h4>Skills:</h4>
        <ul>
            ${skills.map(skill => `<li>${skill}</li>`).join('')}
        </ul>
        <h4>Certifications:</h4>
        <ul>
            ${certificate.map(cert => `<li>${cert}</li>`).join('')}
        </ul>
    `;

    document.getElementById('resume-output').innerHTML = resumeOutput;
    document.getElementById('resume').style.display = 'block';

    // Enable download button
    const downloadButton = document.getElementById('download-button');
    downloadButton.style.display = 'inline-block';

    downloadButton.onclick = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        let y = 10;
        const margin = 10;

        // Name
        doc.setFontSize(22);
        doc.text(name, margin, y);
        y += 10;

        // Contact Information
        doc.setFontSize(12);
        doc.text(`Email: ${email}`, margin, y); y += 6;
        doc.text(`Phone: ${phone}`, margin, y); y += 6;
        doc.text(`LinkedIn: ${linkedin}`, margin, y); y += 6;
        doc.text(`Address: ${address}`, margin, y); y += 10;

        // Experience
        doc.setFontSize(16);
        doc.text("Experience", margin, y); y += 10;
        doc.setFontSize(12);
        doc.text(`${jobTitle} at ${company}`, margin, y); y += 6;
        doc.text(jobDescription, margin, y); y += 10;

        // Education
        doc.setFontSize(16);
        doc.text("Education", margin, y); y += 10;
        doc.setFontSize(12);
        doc.text(`${degree} from ${college}`, margin, y); y += 10;

        // Skills
        doc.setFontSize(16);
        doc.text("Skills", margin, y); y += 10;
        doc.setFontSize(12);
        skills.forEach(skill => {
            doc.text(`- ${skill}`, margin, y); y += 6;
        });
        y += 10;

        // Certifications
        doc.setFontSize(16);
        doc.text("Certifications", margin, y); y += 10;
        doc.setFontSize(12);
        certificate.forEach(cert => {
            doc.text(`- ${cert}`, margin, y); y += 6;
        });

        // Save the PDF
        doc.save("resume.pdf");
    };
});

