// ==UserScript==
// @name         eBird Add Chinese Name Near Scientific Name
// @version      1.9.20250623
// @description  Add Chinese names next to scientific names on eBird species pages
// @name:zh-CN   eBird中文注名
// @description:zh-CN  在eBird网站中的学名后加注中文名，使用 IOC 14.1
// @author       Jiankun Li
// @license      MIT
// @namespace    https://github.com/ljk5403
// @homepageURL  https://github.com/ljk5403/eBirdExtraNames
// @match        https://ebird.org/*
// @match        https://media.ebird.org/*
// @match        https://macaulaylibrary.org/*
// @match        https://merlinbirds.org/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=ebird.org
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/ljk5403/eBirdExtraNames/master/main.js
// @downloadURL  https://raw.githubusercontent.com/ljk5403/eBirdExtraNames/master/main.js
// @supportURL   https://github.com/ljk5403/eBirdExtraNames/issues
// ==/UserScript==

(function() {
    'use strict';

    // Mapping of scientific names to Chinese names
    const nameMap = {
      //PLACEHOLDER_js_nameMap
      //PLACEHOLDER_correction
    };

    // Find all scientific names
    function insertChineseNamesToAll(){
        insertChineseNamesbyCSSPath('.Heading-sub--sci');
        insertChineseNamesbyCSSPath('.sci');
        insertChineseNamesbyCSSPath('.Species-sci.Species-sub');
        insertChineseNamesbyCSSPath('.MediaCredit-sciName');
        insertChineseNamesbyCSSPath('.sciName'); //Support for merlinbirds.org
    }

    // Insert Chinese names base on CSS path
    function insertChineseNamesbyCSSPath(csspath){
        let sciNames = document.querySelectorAll(csspath);
        //ForDebug//console.log(`For CSS Path ${csspath} found sci names `, sciNames)
        for (let sciNameElement of sciNames) {
            insertChineseNames(sciNameElement)
        }
    }
    // Function to extract the first two words from a given scientific name
    function extractFirstTwoWords(sciName) {
        // Split the name by spaces
        const words = sciName.trim().split(/\s+/);
        // Join the first two words back together
        return words.slice(0, 2).join(' ');
    }
    // Function to insert Chinese names next to the scientific name
    function insertChineseNames(sciNameElement) {
        if (sciNameElement) {
            // Check if the element has already been processed
            if (sciNameElement.hasAttribute('data-processed')) {
                //console.log(`Element already processed: ${sciNameElement.textContent.trim()}`);
                return; // Exit the function if already processed
            }

            const scientificName = sciNameElement.textContent.trim();
            //ForDebug//console.log('Scientific name:', scientificName);

            const chineseName = nameMap[extractFirstTwoWords(scientificName)];
            if (chineseName) {
                const chineseNameSpan = document.createElement('span');
                chineseNameSpan.textContent = ` ${chineseName}`;
                sciNameElement.appendChild(chineseNameSpan);
                console.log(`Added Chinese name: ${chineseName} for ${scientificName}`);
                // Mark the element as processed
                sciNameElement.setAttribute('data-processed', 'true');
            } else {
                console.warn(`No Chinese name found for: ${scientificName}`);
                // Mark the element as processed
                sciNameElement.setAttribute('data-processed', 'true');
            }
        } else {
            console.error('Scientific name element not found.');
        }
    }

    //Run function 1s after page loaded(compensatoing the weird "twice load" behavior on merlinbirds.org)
    setTimeout(function() {insertChineseNamesToAll()}, 1000);

    // Create a function that will be called when DOM changes
    function domChangeHandler(mutations) {
        console.log("DOM changed, run insertChineseNamesToAll()", mutations);
        insertChineseNamesToAll();
    }

    // Create a MutationObserver instance with your callback function
    const observer = new MutationObserver(domChangeHandler);

    // Start observing the document with the configured parameters
    observer.observe(document.body, {
        childList: true,  // observe added/removed children
        subtree: true,    // observe changes in descendants too
    });

})();

/*
Test examples: Combination here: https://www.one-tab.com/page/W3-C6qBhTPaE-gyZQHI5Eg
1. Checklist: https://ebird.org/checklist/S183780628
    Testing feature: load names before images
2. Lifelist: https://ebird.org/lifelist?time=life&r=world
3. Explore: https://ebird.org/region/CN-12
            https://ebird.org/targets?r1=CN-12
4. Trip report: https://ebird.org/tripreport/233389
5. Home page: https://ebird.org/home
6. Merlin webpage from the app: https://merlinbirds.org/species/rengre
*/
