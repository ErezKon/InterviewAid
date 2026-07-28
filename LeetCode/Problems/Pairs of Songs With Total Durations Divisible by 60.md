# 1010. Pairs of Songs With Total Durations Divisible by 60

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60](https://leetcode.com/problems/pairs-of-songs-with-total-durations-divisible-by-60)
**Companies:** Amazon, Atlassian, Citadel, Goldman Sachs, Google, Oracle, Paypal, Tiktok

---

## Problem Description
Given an array `time` where `time[i]` is the duration of the `i`‑th song, return the number of pairs of songs `(i, j)` with `i < j` such that the total duration `time[i] + time[j]` is divisible by `60`.

**Constraints** include:
- `1 <= time.length <= 10^5`
- `1 <= time[i] <= 500`

## Examples
**Example 1**
```
Input: time = [30,20,150,100,40]
Output: 3
Explanation: Pairs are (0,2), (1,3), (1,4).
```

**Example 2**
```
Input: time = [60,60,60]
Output: 3
Explanation: Every pair sums to 120, which is divisible by 60.
```

## Approach
Counting Remainders – treat each duration modulo 60 and count complementary remainders.

```text
FUNCTION numPairsDivisibleBy60(time):
    count ← ARRAY[60] filled with 0
    pairs ← 0
    FOR t IN time:
        remainder ← t MOD 60
        complement ← (60 - remainder) MOD 60
        pairs ← pairs + count[complement]
        count[remainder] ← count[remainder] + 1
    RETURN pairs
```

The array `count` stores how many songs have each remainder; each new song forms pairs with previously seen complementary remainders.

## Walkthrough
For `time = [30,20,150,100,40]`:
| t | remainder | complement | pairs added | count after |
|---|-----------|------------|-------------|-------------|
|30|30|30|0|count[30]=1|
|20|20|40|0|count[20]=1|
|150|30|30|1 (previous 30)|count[30]=2|
|100|40|20|1 (previous 20)|count[40]=1|
|40|40|20|1 (previous 20)|count[40]=2|
Total pairs = 3.

## Complexity Analysis
- **Time:** O(n) – single pass through the array.
- **Space:** O(1) – fixed size array of 60 counters.

## Follow‑Up Questions
1. How would you adapt the solution if the divisor were an arbitrary `k`?
2. Can you extend the approach to count triples whose sum is divisible by 60?
3. What if you need to output the actual pairs, not just the count?

## Key Takeaway
By tracking frequency of each remainder modulo 60, we can count complementary pairs in linear time with constant extra space.
