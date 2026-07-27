# 1888. Minimum Number of Flips to Make the Binary String Alternating

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating](https://leetcode.com/problems/minimum-number-of-flips-to-make-the-binary-string-alternating)
**Companies:** Amazon, Google, Ibm, Meta, Microsoft

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION minFlips(s):
    n = len(s)
    s2 = s + s    // handle type-1 operation (rotation) by doubling

    target0 = "".join('0' if i%2==0 else '1' for i in range(2*n))
    target1 = "".join('1' if i%2==0 else '0' for i in range(2*n))

    diff0 = diff1 = 0
    result = n

    FOR i ← 0 TO 2*n - 1:
        IF s2[i] != target0[i]: diff0 += 1
        IF s2[i] != target1[i]: diff1 += 1
        IF i >= n:
            IF s2[i-n] != target0[i-n]: diff0 -= 1
            IF s2[i-n] != target1[i-n]: diff1 -= 1
        IF i >= n - 1:
            result = MIN(result, diff0, diff1)

    RETURN result
```
