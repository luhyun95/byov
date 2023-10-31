//home Carousel
let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-image');

function changeImage() {
    images[currentImageIndex].classList.remove('active');

    currentImageIndex = (currentImageIndex + 1) % images.length;

    images[currentImageIndex].classList.add('active');
}
setInterval(changeImage, 3000);  // Changes every 3 seconds

//Cost Calculator
// Load the navigation
document.getElementById('nav-container').innerHTML = '<nav><ul><li><a href="index.html">Home</a></li><li><a href="guidebook.html">Guidebook</a></li><li><a href="land-investment.html">Land Investment</a></li><li><a href="cost-calculator.html">Cost Calculator</a></li><li><a href="roi-calculator.html">ROI Calculator</a></li><li><a href="mailto:nomadinseoul@gmail.com" class="cta">Inquiry</a></li></ul></nav>';

function toggleSwimmingPoolGroup() {
const group2SwimmingPool = document.getElementById('group2SwimmingPool');
const swimmingPoolInput = document.getElementById('swimmingPool');
const swimmingPoolLabel = document.getElementById('swimmingPoolLabel');

if (swimmingPoolInput.value !== '0') {
  group2SwimmingPool.style.display = 'block';
  swimmingPoolLabel.style.display = 'block';
  group2SwimmingPool.style.margin = 'auto'; // Center-align the dropdown
} else {
  group2SwimmingPool.style.display = 'none';
  swimmingPoolLabel.style.display = 'none';
}
}

// Trigger the function when the value of swimmingPool changes
const swimmingPoolInput = document.getElementById('swimmingPool');
swimmingPoolInput.addEventListener('change', toggleSwimmingPoolGroup);

// Trigger the function on page load
window.onload = function () {
toggleSwimmingPoolGroup();
};

function expand(img) {
var galleryItems = document.getElementsByClassName('gallery-item');
if (img.parentNode.style.flexBasis === '100%') {
  // The image is currently expanded and should be collapsed
  for (var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].style.flexBasis = 'calc(50% - 10px)';
  }
} else {
  // The image is not expanded and should be expanded
  for (var i = 0; i < galleryItems.length; i++) {
    galleryItems[i].style.flexBasis = '0';
  }
  img.parentNode.style.flexBasis = '100%';
}
}

// Trigger the function on page load

  function toggleLeaseholdSection() {
    const landOwnership = document.getElementById('landOwnership').value;
    const leaseholdSection = document.querySelector('.leasehold-section');
    const landPriceInputDiv = document.getElementById('landPriceInputDiv');

    if (landOwnership === 'leasehold') {
      leaseholdSection.style.display = 'block';
      landPriceInputDiv.style.display = 'none';
    } else if (landOwnership === 'freehold') {
      leaseholdSection.style.display = 'none';
      landPriceInputDiv.style.display = 'block';
    }
  }

  // Call the function initially to set the display
  toggleLeaseholdSection();


  function formatIDR(number) {
    if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + 'M';
    }
    return number;
  }


  function updateCurrency() {
    const currency = document.getElementById('currency').value;

    // Update the currency symbol for each amount in the table
    const amounts = document.querySelectorAll('[data-amount]');
    amounts.forEach((amountElement) => {
      const amountInIDR = parseFloat(amountElement.getAttribute('data-amount'));
      const amountInCurrency = convertToCurrency(amountInIDR, currency);
      amountElement.textContent = formatCurrency(amountInCurrency, currency);
    });
  }

  // Function to convert amounts from IDR to the selected currency
  function convertToCurrency(amountInIDR, currency) {
    const exchangeRates = {
      'IDR': 1,
      'USD': 0.000071, // 1 USD = 14,085 IDR (approximately)
      'SGD': 0.000095, // 1 SGD = 10,500 IDR (approximately)
      'KRW': 0.079,    // 1 KRW = 12.658 IDR (approximately)
    };

    const exchangeRate = exchangeRates[currency] || 1; // Use 1 as the default rate for IDR
    const amountInCurrency = amountInIDR * exchangeRate;
    return amountInCurrency;
  }

  function calculateCost(event) {
    event.preventDefault();


    const areaInSqMeters = parseFloat(document.getElementById('area').value);
    const materialType = document.getElementById('material').value;
    const region = document.getElementById('region').value;
    const landPriceIDR = parseFloat(document.getElementById('landPrice').value);
    const landOwnership = document.getElementById('landOwnership').value;
    const landPriceInput = document.getElementById('landPrice');

const swimmingPoolType = document.getElementById('group2SwimmingPool').value;
const swimmingPoolValue = parseFloat(document.getElementById('swimmingPool').value);

    const architectureDesign = document.getElementById('architectureDesignCheckbox').checked;
    const interiorDesign = document.getElementById('interiorDesignCheckbox').checked;
    const projectManagement = document.getElementById('projectManagementCheckbox').checked;
    const furnishing = document.getElementById('furnishingCheckbox').checked;


    const leaseholdYears = parseFloat(document.getElementById('leaseholdYears').value) || 0;
    let costPerSqMeter;

    switch (materialType) {
      case 'economy':
        costPerSqMeter = 5000000;
        break;
      case 'standard':
        costPerSqMeter = 6000000;
        break;
      case 'premium':
        costPerSqMeter = 7500000;
        break;
      case 'luxury':
        costPerSqMeter = 10000000;
        break;
      default:
        costPerSqMeter = 0;
        break;
    }

    // Calculate the total land price based on the land ownership type
    let totalLandPriceIDR;
    if (landOwnership === 'leasehold') {
      totalLandPriceIDR = leaseholdYears * landPriceIDR;
    } else {
      totalLandPriceIDR = parseFloat(landPriceInput.value);
    }

    // Calculate acquisition tax as 5% of the total land price
    const acquisitionTaxRate = 0.05;
    const acquisitionTaxIDR = totalLandPriceIDR * acquisitionTaxRate;

    // Calculate notary fee as 1% of the total land price
    const notaryRate = 0.01;
    const notaryRateIDR = totalLandPriceIDR * notaryRate;


    // Calculate total land cost
    const totalLandCostIDR = totalLandPriceIDR + acquisitionTaxIDR + notaryRateIDR;


    // Convert other currencies to IDR
    const exchangeRateSGDToIDR = 10675;
    const exchangeRateUSDToIDR = 14240;
    const exchangeRateKRWToIDR = 8.46;

    const totalLandPriceSGD = totalLandPriceIDR / exchangeRateSGDToIDR;
    const totalLandPriceUSD = totalLandPriceIDR / exchangeRateUSDToIDR;
    const totalLandPriceKRW = totalLandPriceIDR / exchangeRateKRWToIDR;

    // Calculate house construction cost
    const constructionCostIDR = areaInSqMeters * costPerSqMeter;

    // Calculate swimmingpool cost
     let swimmingPoolCostIDR = 0;
if (swimmingPoolType === 'naturalStone') {
  swimmingPoolCostIDR = swimmingPoolValue * 5000000;
} else if (swimmingPoolType === 'ceramicTiles') {
  swimmingPoolCostIDR = swimmingPoolValue * 4800000;
} else if (swimmingPoolType === 'mozaicTiles') {
  swimmingPoolCostIDR = swimmingPoolValue * 5200000;
}

    // Calculate the cost for each service based on the checkboxes
    const architectureDesignCostIDR = architectureDesign ? areaInSqMeters * 350000 : 0;
    const interiorDesignCostIDR = interiorDesign ? areaInSqMeters * 350000 : 0;
    const projectManagementCostIDR = projectManagement ? constructionCostIDR * 0.15 : 0;
    const furnishingCostIDR = furnishing ? constructionCostIDR * 0.11 : 0;

    // Calculate VAT as 11% of the construction cost
    const vatRate = 0.11;
    const vatIDR = (constructionCostIDR + swimmingPoolCostIDR) * vatRate;


    // Calculate total build cost in IDR
    let totalBuildCostIDR = constructionCostIDR;
    totalBuildCostIDR += vatIDR;

    if (swimmingPoolValue !== 0) {
      totalBuildCostIDR += swimmingPoolCostIDR;
    }

    if (architectureDesign) {
      totalBuildCostIDR += areaInSqMeters * 350000; // Architecture Design cost in IDR
    }
    if (interiorDesign) {
      totalBuildCostIDR += areaInSqMeters * 350000; // Interior Design cost in IDR
    }
    if (projectManagement) {
      const projectManagementCost = constructionCostIDR * 0.15; // 15% of total construction cost
      totalBuildCostIDR += projectManagementCost;
    }
    if (furnishing) {
      const furnishingCost = constructionCostIDR * 0.11; // 11% of total construction cost
      totalBuildCostIDR += furnishingCost;
    }
    // Calculate total cost in IDR
    let totalCostIDR = totalBuildCostIDR;
    totalCostIDR += totalLandCostIDR;

    // Prepare the summary table
    const summaryTable = `
      <table>
          <tr class="highlighted-row">
              <th>Summary</th>
              <th>Amount</th>
          </tr>
          <tr>
              <td>Type of Material</td>
              <td>${materialType}</td>
          </tr>
          <tr>
              <td>Region</td>
              <td>${region}</td>
          </tr>
          <tr>
              <td>Type of Land Ownership</td>
              <td>${landOwnership}</td>
          </tr>
          <tr>
              <td>${landOwnership === 'leasehold' ? 'Leasehold Duration' : 'N/A'}</td>
              <td>${landOwnership === 'leasehold' ? `${leaseholdYears} years` : '-'}</td>
          </tr>
      </table>
  `;

    // Prepare the breakdown of cost structures
    const costTable = `
              <table>
                  <tr class="highlighted-row">
                      <th>Cost Breakdown</th>
                      <th>Amount</th>
                  </tr>
                  <!-- Land Cost -->
                  <tr>
                    <td colspan="2"><strong>Land Cost</strong></td>
                  </tr>
                  <tr>
                    <td>Subtotal</td><td data-amount="${totalLandCostIDR}">${formatCurrency(totalLandCostIDR, 'IDR')}</td>
                    </tr>
                  <tr>
                      <td> Total Land Price</td>
                      <td data-amount="${totalLandPriceIDR}">${formatCurrency(totalLandPriceIDR, 'IDR')}</td>
                 </tr>
                 <tr>
                  <td>Acquisition Tax (5%) </td><td data-amount="${acquisitionTaxIDR}">${formatCurrency(acquisitionTaxIDR, 'IDR')}</td>
                  </tr>
                  <tr>
                  <td>Notary Fee (1%) </td><td data-amount="${notaryRateIDR}">${formatCurrency(notaryRateIDR, 'IDR')}</td>
                  </tr>
                  <!-- Build Cost -->
                  <tr>
                    <td colspan="2"><strong>Build Cost</strong></td>
                    </tr>
                  <tr>
                    <td>Subtotal</td><td data-amount="${totalBuildCostIDR}">${formatCurrency(totalBuildCostIDR, 'IDR')}</td>
                  </tr>
                  <tr>
                  <td>Villa Construction </td>
                  <td data-amount="${constructionCostIDR}">${formatCurrency(constructionCostIDR, 'IDR')}</td>
                  </tr>
                  <tr>
                      <td>Swimming Pool</td>
                      <td data-amount="${swimmingPoolCostIDR}">${formatCurrency(swimmingPoolCostIDR, 'IDR')}</td>
                  </tr>
                  <tr><td>Architecture Design</td><td data-amount="${architectureDesignCostIDR}">${formatCurrency(architectureDesignCostIDR, 'IDR')}</td></tr>
                  <tr><td>Interior Design (optional)</td><td data-amount="${interiorDesignCostIDR}">${formatCurrency(interiorDesignCostIDR, 'IDR')}</td></tr>
              <tr><td>Project Management (optional)</td><td data-amount="${projectManagementCostIDR}">${formatCurrency(projectManagementCostIDR, 'IDR')}</td></tr>
              <tr><td>Furnishing</td><td data-amount="${furnishingCostIDR}">${formatCurrency(furnishingCostIDR, 'IDR')}</td></tr>
                  <tr>
                    <td>VAT (11%)</td><td data-amount="${vatIDR}">${formatCurrency(vatIDR, 'IDR')}</td>
                  </tr>

                  <!-- Add more rows for other cost structures -->
                  <tr>
                      <th>Total Cost</th>
                      <th data-amount="${totalCostIDR}">${formatCurrency(totalCostIDR, 'IDR')}</th>
                  </tr>
              </table>
          `;


    document.getElementById('resultSummary').innerHTML = summaryTable;
    document.getElementById('resultCost').innerHTML = costTable;

    // Show the currency dropdown after the table is displayed
    document.getElementById('currencyDiv').style.display = 'block';
  }

  function formatCurrency(number, currency) {
    switch (currency) {
      case 'IDR':
        return formatIDR(number);
      case 'SGD':
        return formatSGD(number);
      case 'USD':
        return formatUSD(number);
      case 'KRW':
        return formatKRW(number);
      default:
        return '';
    }
  }

  function formatIDR(number) {
    return `${(number / 1000000).toFixed(2)}M IDR`;
  }

  function formatSGD(number) {
    return `SGD ${number.toFixed(2)}`;
  }

  function formatUSD(number) {
    return `$${number.toFixed(2)}`;
  }

  function formatKRW(number) {
    return `${number.toFixed(2)} KRW`;
  }
document.getElementById('calculateButton').addEventListener('click', function() {
  document.getElementById('table').style.display = 'block'; /* Show the group */

document.getElementById('timeline').style.display = 'block';
});


//Blog page go next
    const pages = document.querySelectorAll('.page');
    let currentPage = 0;

    document.getElementById('prev').addEventListener('click', function() {
        if (currentPage > 0) {
            pages[currentPage].classList.remove('active');
            currentPage--;
            pages[currentPage].classList.add('active');
        }
    });

    document.getElementById('next').addEventListener('click', function() {
        if (currentPage < pages.length - 1) {
            pages[currentPage].classList.remove('active');
            currentPage++;
            pages[currentPage].classList.add('active');
        }
    });

    const images = document.querySelectorAll('.carousel-image');
    const leftSection = document.getElementById('leftSection');
    const rightSection = document.getElementById('rightSection');

    function changeImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % images.length;
        images[currentImageIndex].classList.add('active');
    }

    function changePage() {
        pages[currentPage].classList.remove('active');
        currentPage = (currentPage + 1) % pages.length;
        pages[currentPage].classList.add('active');
    }

    setInterval(changeImage, 3000);  // Changes every 3 seconds

    leftSection.addEventListener('click', changePage);
    rightSection.addEventListener('click', changePage);
