# 2997. Minimum Number of Operations to Make Array XOR Equal to K

**Difficulty:** 🟡 Medium

**Companies:** Amazon, American Express, Auriga
---

```
FUNCTION minOperations(nums, k):
    xorAll = XOR of all nums
    RETURN bin(xorAll ^ k).count('1')
```
