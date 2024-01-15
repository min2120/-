
//tvmaze.com/api
//URL: /search/show?q=:query
//http://api.tvmaze.com/search/shows?q=girls


const form = document.querySelector('#searchForm')  // form태그를 사용한 이유 : 실시간 검색을 할 수 있다는 점이 매력적 

form.addEventListener('click', async function (e) {
    e.preventDefault();
    const searchTerm = form.elements.query.value;
    const config = { params: { q: searchTerm } }
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    makeImages(res.data);
    form.elements.query.value = ''
})



const makeImages = (shows) => {
    const section = document.querySelector('section');

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    for (let result of shows) {
        if (result.show.image) {        // 이미지가 없는 것도 있어서 오류가 뜸 -> if문으로 일단은 오류잡음 , 좋은 방법은 아님 
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            section.append(img)
        }
    }
}

