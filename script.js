// slider
const slider = document.querySelector('.carousel-slider');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');

let slideWidth = document.querySelector('.carousel-container').offsetWidth;

rightArrow.addEventListener('click', () => {
    updateSliderPosition(-1);
});

leftArrow.addEventListener('click', () => {
    updateSliderPosition(1);
});

let slideCount = 0
const updateSliderPosition = (slide = 0) => {
    slideCount += slide

    const minTranslateCount = -(slider.childElementCount - 1);
    if (slideCount > 0) {
        slideCount = minTranslateCount;
    } else if (slideCount < minTranslateCount) {
        slideCount = 0;
    }

    slider.style.transform = `translateX(${slideCount * slideWidth}px)`;
}

window.addEventListener('resize', () => {
    slideWidth = document.querySelector('.carousel-container').offsetWidth;
    updateSliderPosition();
});

// auto run slider
let handleAutoSlide = setInterval(() => {
    updateSliderPosition(-1)
}, 3000);

slider.addEventListener("mouseenter", ()=>{
    clearInterval(handleAutoSlide)
})

slider.addEventListener("mouseleave", ()=>{
    handleAutoSlide = setInterval(() => {
        updateSliderPosition(-1)
    }, 3000);

})


// items

// increase item count
const incItemCounts = document.getElementsByClassName("inc-itemCount")
const decItemCounts = document.getElementsByClassName("dec-itemCount")

for (const incBtn of incItemCounts) {
    incBtn.addEventListener("click", () => {
        // const prevCount = Number.parseInt(incBtn.parentElement.children[1].innerHTML)
        handleItemCount(incBtn.parentElement.children[1], "inc")

    })
}

for (const decBtn of decItemCounts) {
    decBtn.addEventListener("click", () => {
        handleItemCount(decBtn.parentElement.children[1], "dec")
        // const prevCount = decBtn.parentElement.children[1].innerHTML +=1
    })
}

const handleItemCount = (btn, countType) => {
    const prevCount = Number.parseInt(btn.innerHTML)

    if (countType === "inc") {
        btn.innerHTML = prevCount + 1

    }
    else {
        if (prevCount !== 0) {

            btn.innerHTML = prevCount - 1
        }
    }


}

// add item 
const cart = []
const addItemBtns = document.getElementsByClassName("addItem")
const selectedItems = document.getElementById("selectedItems")
const total = document.getElementById("total")

for (const addBtn of addItemBtns) {
    addBtn.addEventListener("click", () => {
        const parentElem = addBtn.parentElement
        const itemCount = Number.parseInt(parentElem.children[0].children[1].innerHTML)
        const itemPrice = Number.parseInt(parentElem.parentElement.children[1].children[0].innerHTML.slice(1))

        if (cart.length < 8) {

            for (let i = 1; i <= itemCount; i++) {
                if (cart.length < 8) {
                    cart.push(itemPrice)
                }
                else {
                    break;
                }

            }

            handleTotalPrice()
        }

        if (cart.length === 8) {
            Array.from(addItemBtns).forEach(element => {
                element.disabled = true
            });
        }

    })
}

const handleTotalPrice = () => {
    const totalPrice = cart.reduce((a, b) => {
        return a + b
    },0)

    total.innerHTML = totalPrice
    selectedItems.innerHTML = cart.length
}



