# 1010. Pairs of Songs With Total Durations Divisible by 60

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60](https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60)
**Companies:** Amazon, Atlassian, Citadel, Goldman Sachs, Google, Oracle, Paypal, Tiktok

---

## Approach: Counting Remainders — O(n) ✅

```
FUNCTION numPairsDivisibleBy60(time):
    count = [0] * 60
    pairs = 0

    FOR t IN time:
        remainder = t % 60
        complement = (60 - remainder) % 60
        pairs += count[complement]
        count[remainder] += 1

    RETURN pairs
```

Same as Two Sum but with modular arithmetic. Complement of remainder `r` is `(60 - r) % 60`.
