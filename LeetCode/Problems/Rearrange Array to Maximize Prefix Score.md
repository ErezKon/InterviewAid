# 2587. Rearrange Array to Maximize Prefix Score

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Ibm, Jpmorgan
---

```
FUNCTION maxScore(nums):
    SORT nums DESC
    prefix = 0; count = 0
    FOR num IN nums:
        prefix += num
        IF prefix > 0: count += 1
        ELSE: BREAK
    RETURN count
```
