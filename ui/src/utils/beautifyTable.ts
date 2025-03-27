export function beautifyTable(htmlString: string) {
    // Wrap the first row with <thead> if it's not already wrapped
    const theadStartIndex = htmlString.indexOf('<tr>');
    const theadEndIndex = htmlString.indexOf('</tr>');
    let modifiedHtml = htmlString;
    if (theadStartIndex !== -1 && theadEndIndex !== -1 && theadStartIndex < theadEndIndex) {
      modifiedHtml = `
        <table>
          <thead>
            ${htmlString.substring(theadStartIndex, theadEndIndex + '</tr>'.length)}
          </thead>
          ${htmlString.substring(theadEndIndex + '</tr>'.length)}
        </table>
      `;
    }
  
    // Wrap the table with the specified div and add classes to the elements
    const wrappedHtml = `
      <div class="relative overflow-hidden shadow-md rounded-lg">
        ${modifiedHtml.replace('<table', '<table')}
      </div>
    `;
  
    // Convert the HTML string to a DOM element
    const tempContainer = document.createElement('div');
    tempContainer.innerHTML = wrappedHtml;
  
    // Add classes to the thead tags and td tags within thead
    const thead = tempContainer.querySelector('thead');
    if (thead) {
      thead.classList.add('uppercase', 'bg-[#AA30D4]', 'text-[#ffffff]');
      const thTags = thead.querySelectorAll('td');
      thTags.forEach((td) => {
        td.classList.add('py-1', 'border', 'text-center', 'p-4');
      });
    }
  
    // Add classes to the tbody tags and tr, td tags within tbody
    const tbody = tempContainer.querySelector('tbody');
    if (tbody) {
      tbody.classList.add('bg-white', 'text-gray-500', 'bg-[#FFFFFFEF]', 'text-[#181619]');
      const trTags = tbody.querySelectorAll('tr');
      trTags.forEach((tr) => {
        tr.classList.add('py-5');
        const tdTags = tr.querySelectorAll('td');
        tdTags.forEach((td) => {
          td.classList.add('py-5', 'border', 'text-center', 'p-4');
        });
      });
    }
  
    // Return the modified HTML string
    return tempContainer.innerHTML;
  }