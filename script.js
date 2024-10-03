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
    const skills = document.getElementById('skills').value.split(',');
    const certificate = document.getElementById('certificate').value.split(',');

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
            ${skills.map(skill => `<li>${skill.trim()}</li>`).join('')}
        </ul>
        <h4>Certifications:</h4>
        <ul>
            ${certificate.map(cert => `<li>${cert.trim()}</li>`).join('')}
        </ul>
    `;

    document.getElementById('resume-output').innerHTML = resumeOutput;
    document.getElementById('resume').style.display = 'block';

    // Enable download button
    document.getElementById('download-button').style.display = 'inline-block';
    document.getElementById('download-button').onclick = function() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Set up the PDF content
        doc.fromHTML(document.getElementById('resume-output'), 10, 10, {
            'width': 190 // Adjust width for PDF
        });

        // Save the PDF
        doc.save(`${name.replace(/\s+/g, '_')}_Resume.pdf`);
    };
});
