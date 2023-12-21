document.addEventListener("DOMContentLoaded", async () => {
    try {
      // Fetch data from the API
      const response = await fetch('/api/data'); // Using a dedicated API route
      const responseData = await response.json(); // Use a different variable name
  
      console.log('Data:', responseData); // Log the data to the console
  
      // Process and display data
      if (responseData && responseData.products) {
        const productsArray = Object.values(responseData.products);
  
        if (productsArray.length > 0) {
          const container = document.getElementById("container");
          const table = document.createElement("table");
          table.classList.add("product-table"); // Add a class for styling
  
          // Create table header
          const thead = document.createElement("thead");
          const headerRow = document.createElement("tr");
          const titleHeader = document.createElement("th");
          const priceHeader = document.createElement("th");
          const additionalInfoHeader = document.createElement("th"); // New column header
          titleHeader.textContent = "Title";
          priceHeader.textContent = "Price";
        //   additionalInfoHeader.textContent = "Additional Info"; // New column header
          headerRow.appendChild(titleHeader);
          headerRow.appendChild(priceHeader);
        //   headerRow.appendChild(additionalInfoHeader); // New column header
          thead.appendChild(headerRow);
          table.appendChild(thead);
  
          // Create table body
          const tbody = document.createElement("tbody");
          productsArray.forEach((product, index) => {
            const row = document.createElement("tr");
            row.classList.add(index % 2 === 0 ? "even" : "odd"); // Alternate row colors
  
            // Add a column for the title
            const titleCell = document.createElement("td");
            titleCell.textContent = product.title;
            row.appendChild(titleCell);
  
            // Add a column for the price
            const priceCell = document.createElement("td");
            priceCell.textContent = product.price;
            row.appendChild(priceCell);
  
            // Add a column for additional information (replace 'additionalInfo' with the actual property you want to display)
            // const additionalInfoCell = document.createElement("td");
            // additionalInfoCell.textContent = product.additionalInfo; // Replace 'additionalInfo' with the actual property
            // row.appendChild(additionalInfoCell);
  
            tbody.appendChild(row);
          });
  
          table.appendChild(tbody);
  
          // Append table to container
          container.appendChild(table);
        } else {
          console.log('Products array is empty.');
        }
      } else {
        console.log('Data or products property does not exist.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });
  