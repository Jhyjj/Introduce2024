console.log(projectData);

document.addEventListener("DOMContentLoaded", function() {

    const yearUl = document.getElementById("yearUl");
    const yearLis = yearUl.querySelectorAll(".yearli");
    const contentDiv = document.querySelector("#container > div");

    // 초기 선택값 설정 및 데이터 표시
    document.querySelector(".yearli.select").click();

    yearLis.forEach(li => {
        li.addEventListener("click", function() {
            // 기존에 'select' 클래스를 가진 항목에서 클래스 제거
            document.querySelector(".yearli.select")?.classList.remove("select");

            // 클릭한 항목에 'select' 클래스 추가
            li.classList.add("select");

            // 기존에 생성된 ul을 제거
            const existingUl = contentDiv.querySelector("ul");
            if (existingUl) {
                contentDiv.removeChild(existingUl);
            }

            // 클릭한 항목의 텍스트 값과 일치하는 JSON 데이터 찾기
            const yearText = li.textContent;
            const yearData = projectData[yearText];

            const projectList = document.createElement('ul');
            yearData.forEach((e, index) => {
                const projectItem = document.createElement('li');
                projectItem.classList.add('project-item');

                const projectImage = document.createElement('img');
                projectImage.src = e.img;
                projectItem.appendChild(projectImage);
                projectItem.addEventListener('click', function (){
                    showPopup(yearText,index);
                });

                projectList.appendChild(projectItem);
            });

            contentDiv.appendChild(projectList);
        });
    });

    // 초기 선택값 설정: "2022"가 기본으로 선택되어 있도록 설정
    yearUl.querySelector(".yearli").classList.add("select");
    yearUl.querySelector(".yearli.select").click();
});


//팝업 실행 함수 
function showPopup(yearText,index) {
    console.log('팝업 함수 실행');
    var popup = document.getElementById('projectPopup');
    // var popupcon = document.getElementsByClassName('popup-content');
    var details = document.getElementById('popupDetails');
    const links = projectData[yearText][index].link.split(', ');

    const linkHTML = links.map(link => {
        if (link.startsWith('https://github.com/')) {
            return `<a href="${link}" target="_blank" rel="noopener noreferrer" data-testid="github"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><mask id="github-icon_svg__a" width="20" height="20" x="0" y="0" maskUnits="userSpaceOnUse"><path fill="#fff" fill-rule="evenodd" d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z" clip-rule="evenodd"></path></mask><g mask="url(#github-icon_svg__a)"><path fill="currentColor" d="M0 0h20v20H0z" class="svgPath"></path></g></svg></a>`;
        } else {
            return `<a href="${link}" target="_blank" rel="noopener noreferrer"><span class="material-symbols-outlined">home</span></a>`;
        }
    }).join('');

    details.innerHTML = `
    <img src='${projectData[yearText][index].img2}'/>
    <div class='text-content'>
        <h2>${projectData[yearText][index].title}</h2>
        <p>${projectData[yearText][index].desc}</p>
        <p>사용스택 : ${projectData[yearText][index].stack}</p>
        <p>작업인원 : ${projectData[yearText][index].part}</p>
        <div class="links">
            ${linkHTML}
        </div>
    </div>
    
    `


    popup.style.display = "block";
}

//팝업 해제 함수
function closePopup() {
    var popup = document.getElementById('projectPopup');
    popup.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
    // 페이지 로딩 완료 시 실행
    const navItems = document.querySelectorAll('header nav ul li a');

    for (let i = 0; i < navItems.length; i++) {
        navItems[i].addEventListener('click', function(e) {
            e.preventDefault(); // 기본 이동 방지
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth' // 부드러운 스크롤
            });
        });
    }
});

function typeEffect(element, speed, callback) {
    const text = element.innerHTML;
    let i = 0;
    element.innerHTML = ''; // 초기화

    // 커서 요소 생성
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    cursor.innerHTML = '|'; // 커서 문자
    element.appendChild(cursor);

    const timer = setInterval(() => {
        if (i < text.length) {
            cursor.before(text.charAt(i));
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

// 첫 번째 요소 타이핑이 끝난 후 두 번째 요소에 타이핑 시작
const typingElement1 = document.getElementById('typing1');
const typingElement2 = document.getElementById('typing2');
typingElement2.style.display = 'none';

typeEffect(typingElement1, 100, () => {
    typingElement2.style.display = 'block';
    typeEffect(typingElement2, 100, () => {
        // 타이핑 애니메이션 이후 커리어 항목 애니메이션 시작
        showCareerItem(document.getElementById('career1'), 500);
        showCareerItem(document.getElementById('career2'), 1000);
        showCareerItem(document.getElementById('career3'), 1500);
        showCareerItem(document.getElementById('career4'), 2000);
    });
});


function showCareerItem(item, delay) {
    setTimeout(() => {
        item.style.opacity = 1;
    }, delay);
}



window.onload = renderProjects;
