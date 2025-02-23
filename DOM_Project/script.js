document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("inputForm");
    const tableBody = document.getElementById("dataTable");

    // Fetch and display books when the page loads
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

        // Send a POST request to the API
        try {
            const response = await fetch('https://bookstore-api-six.vercel.app/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author, publisher }),
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            // Fetch and display books again to sync with the API
            fetchAndDisplayBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }

        // Reset the form after submission
        form.reset();
    });
});

// Function to fetch and display books from the API
async function fetchAndDisplayBooks() {
    try {
        // Fetch books from the API
        const response = await fetch('https://bookstore-api-six.vercel.app/api/books', {
        });

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
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.publisher}</td>
                <td><button class="delete-btn">Delete</button></td>
            `;
            tableBody.appendChild(row);

            row.querySelector('.delete-btn').addEventListener('click', async () => {
                try {
                    // Send a DELETE request to the API
                    const deleteResponse = await fetch(`https://bookstore-api-six.vercel.app/api/books/${book.id}`, {
                        method: 'DELETE',
                    });

                    if (!deleteResponse.ok) {
                        throw new Error('Failed to delete book');
                    }

                    row.remove();
                } catch (error) {
                    console.error('Error deleting book:', error);
                }
            });
        });
    } catch (error) {
        console.error('Error fetching or displaying books:', error);
    }
}
