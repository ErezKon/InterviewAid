# 2665. Counter II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/counter-ii](https://leetcode.com/problems/counter-ii)
**Companies:** Amazon, Google, Microsoft, Yandex

---

```javascript
var createCounter = function(init) {
    let count = init;
    return {
        increment: () => ++count,
        decrement: () => --count,
        reset: () => count = init
    };
};
```
