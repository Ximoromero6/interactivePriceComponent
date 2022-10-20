(function() {
    const slider = document.getElementById("myRange");
    const min = slider.min;
    const max = slider.max;
    const val = slider.value;

    const numberPageViewsContainer = document.querySelector(".pageViews > span");
    const priceMonthContainer = document.querySelector(".dynamicPrice");

    let numberPageViews = "100K";
    let priceMonth = 16;
    let isMonthlyPay = true;
    const discount = 25;

    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    });

    const checkBoxPricing = document.getElementById("checkBoxPricing");

    checkBoxPricing.addEventListener("change", () => {
        isMonthlyPay = !isMonthlyPay;

        //Calculamos precio si se cambia a plan anual nada más entrar en la página
        if (!isMonthlyPay) {
            let priceWithDiscount = calculateDiscount(priceMonth, discount);

            priceMonthContainer.textContent = `${formatter.format(priceWithDiscount)}`;
        } else {
            priceMonthContainer.textContent = `${formatter.format(priceMonth)}`;
        }
    });

    function calculateDiscount(originalPrice, discountN) {
        return priceMonth - (discountN * Number(originalPrice) / 100);
    }

    //Ajustar tamaño fondo del input tipo range
    slider.style.backgroundSize = (val - min) * 100 / (max - min) + "% 100%";

    slider.addEventListener("input", (evt) => {
        evt.target.style.backgroundSize = (evt.target.value - evt.target.min) * 100 / (evt.target.max - evt.target.min) + "% 100%";

        if (evt.target.value == 0) {
            numberPageViews = "10K";
            priceMonth = 8;
        } else if (evt.target.value == 25) {
            numberPageViews = "50K";
            priceMonth = 12;
        } else if (evt.target.value == 50) {
            numberPageViews = "100K";
            priceMonth = 16;
        } else if (evt.target.value == 75) {
            numberPageViews = "500K";
            priceMonth = 24;
        } else if (evt.target.value == 100) {
            numberPageViews = "1M";
            priceMonth = 36;
        }

        numberPageViewsContainer.textContent = numberPageViews;

        //Calculamos el 25% menos si el pago es anual
        if (!isMonthlyPay) {
            let priceWithDiscount = calculateDiscount(priceMonth, discount);

            priceMonthContainer.textContent = `${formatter.format(priceWithDiscount)}`;
        } else {
            priceMonthContainer.textContent = `${formatter.format(priceMonth)}`;
        }

    });

    //Responsive container
    const parentDiv = document.querySelector(".containerPageviewText");
    const newElement = document.getElementById("myRange");

    function responsive(x) {
        if (x.matches) {
            parentDiv.insertBefore(newElement, parentDiv.childNodes[3]);
        } else {
            parentDiv.parentNode.insertBefore(newElement, parentDiv.nextSibling);
        }
    }

    let query = window.matchMedia("(max-width: 576px)");
    responsive(query);
    query.addListener(responsive);

})();