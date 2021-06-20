console.log("Working!");

let page1 = document.querySelector("#page1");
let page2 = document.querySelector("#page2");
let page3 = document.querySelector("#page3");
let page1Div = document.querySelector("#page1Div");
let page2Div = document.querySelector("#page2Div");
let page3Div = document.querySelector("#page3Div");

page1.addEventListener('click', () => {
    page1Div.classList.remove('d-none');
    page1Div.classList.add('d-block');
    page2Div.classList.remove('d-block');
    page2Div.classList.add('d-none');
    page3Div.classList.remove('d-block');
    page3Div.classList.add('d-none');
    page1.classList.add('active');
    page2.classList.remove('active');
    page3.classList.remove('active');
})

page2.addEventListener('click', () => {
    page1Div.classList.remove('d-none');
    page2Div.classList.add('d-block');
    page3Div.classList.remove('d-block');
    page3Div.classList.add('d-none');
    page1Div.classList.remove('d-block');
    page1Div.classList.add('d-none');
    page2.classList.add('active');
    page3.classList.remove('active');
    page1.classList.remove('active');
})

page3.addEventListener('click', () => { 
    page3Div.classList.remove('d-none');
    page3Div.classList.add('d-block');
    page1Div.classList.remove('d-block');
    page1Div.classList.add('d-none');
    page2Div.classList.remove('d-block');
    page2Div.classList.add('d-none');
    page3.classList.add('active');
    page2.classList.remove('active');
    page1.classList.remove('active');   
})

/*
async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}
*/


