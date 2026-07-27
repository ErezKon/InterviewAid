# 982. Triples with Bitwise AND Equal To Zero

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero](https://leetcode.com/problems/triples-with-bitwise-and-equal-to-zero)
**Companies:** Flipkart, Microsoft, Philips

---

```
FUNCTION countTriplets(nums):
    // Precompute AND of all pairs
    pairAnd = Counter()
    FOR a IN nums:
        FOR b IN nums:
            pairAnd[a & b] += 1
    // Count triples
    count = 0
    FOR c IN nums:
        FOR val, freq IN pairAnd.items():
            IF val & c == 0: count += freq
    RETURN count
```
