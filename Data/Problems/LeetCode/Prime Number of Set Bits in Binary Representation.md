# 762. Prime Number of Set Bits in Binary Representation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation](https://leetcode.com/problems/prime-number-of-set-bits-in-binary-representation)
**Companies:** Amazon, Google

---

## Problem Description

Given two integers `left` and `right`, return *the **count** of numbers in the **inclusive** range* `[left, right]` *having a **prime number of set bits** in their binary representation*.

Recall that the **number of set bits** an integer has is the number of `1`'s present when written in binary.

- For example, `21` written in binary is `10101`, which has `3` set bits.

**Constraints:**
- `1 <= left <= right <= 10^6`
- `0 <= right - left <= 10^4`

## Examples

**Example 1:**
```
Input: left = 6, right = 10
Output: 4
Explanation:
6  -> 110 (2 set bits, 2 is prime)
7  -> 111 (3 set bits, 3 is prime)
8  -> 1000 (1 set bit, 1 is not prime)
9  -> 1001 (2 set bits, 2 is prime)
10 -> 1010 (2 set bits, 2 is prime)
4 numbers have a prime number of set bits.
```

**Example 2:**
```
Input: left = 10, right = 15
Output: 5
Explanation:
10 -> 1010 (2 set bits, 2 is prime)
11 -> 1011 (3 set bits, 3 is prime)
12 -> 1100 (2 set bits, 2 is prime)
13 -> 1101 (3 set bits, 3 is prime)
14 -> 1110 (3 set bits, 3 is prime)
15 -> 1111 (4 set bits, 4 is not prime)
5 numbers have a prime number of set bits.
```

## Approach
The set‑bit count of a number can be obtained by repeatedly clearing the lowest set bit. Pre‑compute the small set of prime counts (up to 20 for 32‑bit integers). Iterate through the range, count set bits, and increment the answer when the count is prime.

### Pseudocode
```text
FUNCTION countPrimeSetBits(left, right):
    SET primeSet ← {2,3,5,7,11,13,17,19}
    SET answer ← 0
    FOR num ← left TO right:
        SET bits ← countSetBits(num)
        IF bits IN primeSet:
            SET answer ← answer + 1
    RETURN answer

FUNCTION countSetBits(x):
    SET count ← 0
    WHILE x ≠ 0:
        SET x ← x AND (x - 1)   // clear lowest set bit
        SET count ← count + 1
    RETURN count
```

## Walkthrough
For `num = 6` (binary `110`):
- `countSetBits` clears bits: 110 → 100 (count=1) → 000 (count=2). `bits=2` is prime → increment answer.
The loop repeats for each number up to `right`.

## Complexity Analysis
- Time: `O((right‑left+1) * k)` where `k` is the number of set bits per integer (≤ 32). Effectively linear in the range size.
- Space: `O(1)` auxiliary space.

## Follow‑Up Questions
- How would you handle a range up to `10^9` efficiently?
- Can you pre‑compute results for all numbers up to a maximum and answer queries in `O(1)`?
- What if the definition of “prime” changes to include only odd primes?

## Key Takeaway
Counting set bits with bit‑trick `x = x & (x‑1)` combined with a small prime lookup yields a fast solution for ranges of moderate size.
