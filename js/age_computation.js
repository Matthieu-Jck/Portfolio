function updateAge() {
    var birthYear = 1999;
    var currentYear = new Date().getFullYear();
    var age = currentYear - birthYear;
    document.getElementById('age').textContent = age;
}
window.addEventListener('load', updateAge);

