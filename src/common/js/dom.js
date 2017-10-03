/**
 * 给DOM添加class
 * @param el
 * @param className
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  // 将class按照空格拆分成数组
  let newClass = el.className.split(' ')
  // 将要添加的class加入到数组
  newClass.push(className)
  // 拼接成字符串
  el.className = newClass.join(' ')
}

/**
 * 判断DOM 是否包含className
 * @param el
 * @param className
 * @returns {boolean}
 */
export function hasClass(el, className) {
  // 正则判断是否包含class
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
