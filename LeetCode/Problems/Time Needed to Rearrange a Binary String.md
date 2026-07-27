# 2380. Time Needed to Rearrange a Binary String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string](https://leetcode.com/problems/time-needed-to-rearrange-a-binary-string)
**Companies:** Amazon, Paypal, Salesforce, Servicenow, Wayfair

---

```
FUNCTION secondsToRemoveOccurrences(s):
    seconds = 0; zeros = 0
    FOR c IN s:
        IF c == '0':
            zeros += 1
        ELSE IF zeros > 0:
            seconds = MAX(seconds + 1, zeros)
    RETURN seconds
```
