document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inputForm");
    const tableBody = document.getElementById("dataTable");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const Bookname = document.getElementById("Bookname").value;
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;

        // Create a new table row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${Bookname}</td>
            <td>${title}</td>
            <td>${author} <button class="delete-btn">Delete</button> </td>
            
        `;

        // Append row to table
        tableBody.appendChild(row);

        // Add event listener to delete button
        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
        });

        // Reset the form after submission
        form.reset();
    });
});
