document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inputForm");
    const tableBody = document.getElementById("dataTable");

    // NEW CODE: Fetch and display books when the page loads (Step 3)
    fetchAndDisplayBooks();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const publisher = document.getElementById("publisher").value;

        // Create a new table row
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${title}</td>
            <td>${author}</td>
            <td>${publisher} <button class="delete-btn">Delete</button> </td>
        `;

        // Append row to table
        tableBody.appendChild(row);

        // Add event listener to delete button
        row.querySelector(".delete-btn").addEventListener("click", function () {
            row.remove();
        });

        // NEW CODE: Send a POST request to the API (Step 2)
        try {
            const response = await fetch('https://bookstore-api-six.vercel.app/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, publisher }),
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            // NEW CODE: Fetch and display books again to sync with the API (Step 3)
            fetchAndDisplayBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }

        // Reset the form after submission
        form.reset();
    });
});

// NEW CODE: Function to fetch and display books from the API (Step 3)
async function fetchAndDisplayBooks() {
    try {
        // Fetch books from the API
        const response = await fetch('https://bookstore-api-six.vercel.app/books');
        if (!response.ok) {
            throw new Error('Failed to fetch books');
        }

        // Parse the JSON response
        const books = await response.json();

        // Get the table body element
        const tableBody = document.getElementById('dataTable');

        // Clear any existing rows in the table
        tableBody.innerHTML = '';

        // Loop through the books and create table rows
        books.forEach(book => {
            const row = document.createElement('tr');

            // Create and append table cells for each book property
            const titleCell = document.createElement('td');
            titleCell.textContent = book.title;
            row.appendChild(titleCell);

            const authorCell = document.createElement('td');
            authorCell.textContent = book.author;
            row.appendChild(authorCell);

            const publisherCell = document.createElement('td');
            publisherCell.textContent = book.publisher;
            row.appendChild(publisherCell);

            // NEW CODE: Add a delete button for each book (Step 4)
            const deleteCell = document.createElement('td');
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-btn');
            deleteButton.addEventListener('click', async () => {
                try {
                    // NEW CODE: Send a DELETE request to the API
                    const deleteResponse = await fetch(`https://bookstore-api-six.vercel.app/books/${book.id}`, {
                        method: 'DELETE',
                    });

                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete book');
                    }

                    // OLD CODE: Remove the row from the table (local DOM manipulation)
                    row.remove();
                } catch (error) {
                    console.error('Error deleting book:', error);
                }
            });
            deleteCell.appendChild(deleteButton);
            row.appendChild(deleteCell);

            // Append the row to the table body
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching or displaying books:', error);
    }
}