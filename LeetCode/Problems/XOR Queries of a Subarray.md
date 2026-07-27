# 1310. XOR Queries of a Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/xor-queries-of-a-subarray](https://leetcode.com/problems/xor-queries-of-a-subarray)
**Companies:** Airtel, Amazon, Bloomberg, Google

---

```
FUNCTION xorQueries(arr, queries):
    prefix = [0]
    FOR num IN arr: prefix.ADD(prefix[-1] ^ num)
    RETURN [prefix[r+1] ^ prefix[l] for l, r in queries]
```
