# 2516. Take K of Each Character From Left and Right

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/take-k-of-each-character-from-left-and-right](https://leetcode.com/problems/take-k-of-each-character-from-left-and-right)
**Companies:** Amazon, Bloomberg, Google, Meta

---

```
FUNCTION takeCharacters(s, k):
    total = Counter(s)
    IF any(total[c] < k for c in 'abc'): RETURN -1

    // Find longest middle window we can skip
    maxWindow = 0; window = Counter(); left = 0
    FOR right ← 0 TO len(s) - 1:
        window[s[right]] += 1
        WHILE any(total[c] - window[c] < k for c in 'abc'):
            window[s[left]] -= 1; left += 1
        maxWindow = MAX(maxWindow, right - left + 1)

    RETURN len(s) - maxWindow
```
