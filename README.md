# 스케줄러 

## 회사 내 팀원들의 스케줄을 부서별로 확인


# 동적인 플레이스홀더 예제

이 프로젝트는 HTML, CSS, JavaScript를 사용하여 동적인 플레이스홀더를 만드는 방법을 보여줍니다. 사용자 입력에 따라 플레이스홀더 텍스트가 이동하고 크기가 조절되는 애니메이션 효과를 제공합니다.

## 실시간 데모

다음 링크에서 실시간 데모를 확인할 수 있습니다:

[**동적인 플레이스홀더 데모**](https://codepen.io/xmeqsqdr-the-bold/pen/KKjvPLW)

## 프로젝트 구조

```plaintext
/project-root
│
├── index.html
├── style.css
└── script.js
작동 방식
HTML
HTML 구조는 div 안에 플레이스홀더를 위한 p 태그와 사용자 입력을 위한 input 태그를 포함하고 있습니다.

html
코드 복사
<div class="input-container">
    <p class="placeholder">Enter your text</p>
    <input type="text" id="dynamic-input">
</div>
CSS
CSS는 부모 요소에 relative 포지셔닝을, 자식 요소인 플레이스홀더에 absolute 포지셔닝을 적용합니다. .small 및 .active 클래스는 애니메이션 효과를 처리합니다.

css
코드 복사
.input-container {
    position: relative;
    width: 300px;
}

.placeholder {
    position: absolute;
    top: 0;
    left: 10px;
    font-size: 16px;
    transition: font-size 0.3s, top 0.3s;
}

input:focus + .placeholder,
input:not(:placeholder-shown) + .placeholder {
    font-size: 12px;
    top: -20px;
}
JavaScript
JavaScript는 사용자 상호작용에 따라 필요한 클래스를 추가하거나 제거합니다 (예: 입력 필드에 텍스트가 있을 때 또는 포커스가 있을 때).
document.getElementById('dynamic-input').addEventListener('change', function() {
    const placeholder = this.previousElementSibling;

    if (this.value !== '') {
        placeholder.classList.add('small', 'active');
    } else {
        placeholder.classList.remove('small', 'active');
    }
});
