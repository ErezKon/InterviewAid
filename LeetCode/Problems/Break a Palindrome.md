# 1328. Break a Palindrome

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/break-a-palindrome](https://leetcode.com/problems/break-a-palindrome)
**Companies:** Dell, Expedia, Mathworks, Nvidia, Vmware, Workday

---

```
FUNCTION breakPalindrome(palindrome):
    n = len(palindrome)
    IF n == 1: RETURN ""

    arr = list(palindrome)
    FOR i ← 0 TO n/2 - 1:
        IF arr[i] != 'a':
            arr[i] = 'a'
            RETURN JOIN(arr)

    arr[-1] = 'b'    // all 'a's: change last to 'b'
    RETURN JOIN(arr)
```

Change first non-'a' (in first half) to 'a'. If all 'a's, change last to 'b'.
