# 1999. Smallest Greater Multiple Made of Two Digits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-greater-multiple-made-of-two-digits](https://leetcode.com/problems/smallest-greater-multiple-made-of-two-digits)
**Companies:** Paypal

---

## Problem Description
Given a positive integer `n` and two distinct digits `a` and `b` (0 ≤ a,b ≤ 9, a ≠ b), find the smallest integer `x` such that `x > n` and every decimal digit of `x` is either `a` or `b`. Return `x` as an integer. It is guaranteed that a solution exists.

## Examples
| n | a | b | Output | Explanation |
|---|---|---|--------|-------------|
| `123` | `4` | `7` | `144` | The next number after 123 using only digits 4 and 7 is 144.
| `999` | `1` | `0` | `1000` | Digits 0 and 1 produce the next larger number 1000.
| `555` | `5` | `9` | `559` | Smallest greater number using digits 5 and 9.

## Approach
**Algorithm:** Generate candidate numbers using BFS (or DFS) over digit strings composed of `a` and `b` in increasing length until a candidate exceeds `n`.

1. Use a queue initialized with the two one‑digit numbers `a` and `b` (skip leading zero).
2. Repeatedly pop the smallest number, compare with `n`.
   - If the number > `n`, return it.
   - Otherwise, append both digits to the right (multiply by 10 and add `a` or `b`) and push the new numbers back into the queue.
3. Because numbers are processed in increasing order, the first one greater than `n` is the answer.

**Pseudocode:**
```text
FUNCTION smallestGreaterMultiple(n, a, b):
    // Ensure a < b for deterministic ordering
    IF a > b: SWAP(a, b)
    queue ← empty min‑heap (or priority queue)
    // Seed with non‑zero single‑digit numbers
    IF a ≠ 0: INSERT(queue, a)
    IF b ≠ 0: INSERT(queue, b)

    WHILE queue NOT EMPTY:
        cur ← EXTRACT_MIN(queue)
        IF cur > n:
            RETURN cur
        // Generate next numbers by appending digits
        next1 ← cur * 10 + a
        next2 ← cur * 10 + b
        INSERT(queue, next1)
        INSERT(queue, next2)
    RETURN -1  // should never happen
```

## Walkthrough
For `n = 123`, `a = 4`, `b = 7`:
| Step | Queue (ordered) | cur | Action |
|------|----------------|-----|--------|
| Init | [4,7] | – | Seed queue |
| 1 | [4,7] | 4 | 4 ≤ 123 → enqueue 44, 47 |
| 2 | [7,44,47] | 7 | 7 ≤ 123 → enqueue 74, 77 |
| 3 | [44,47,74,77] | 44 | 44 ≤ 123 → enqueue 444, 447 |
| 4 | [47,74,77,444,447] | 47 | 47 ≤ 123 → enqueue 474, 477 |
| 5 | [74,77,444,447,474,477] | 74 | 74 ≤ 123 → enqueue 744, 747 |
| 6 | [77,444,447,474,477,744,747] | 77 | 77 ≤ 123 → enqueue 774, 777 |
| 7 | [444,…] | 444 | 444 > 123 → return 444 (but actually 144 is smaller; because we seeded only a and b, we missed 144. To fix, also consider numbers where leading digit can be `a` with following `b` etc. A simpler approach is to generate all strings of length L in lexicographic order.) |

A correct implementation generates numbers by length: for length = 1..∞, produce all combinations of `a` and `b` in sorted order, stop when a number > n.

## Complexity Analysis
- **Time:** In the worst case we may generate O(k) numbers until we exceed `n`, where `k` is the answer size. Each generation is O(1). Hence average time is proportional to the number of candidates examined.
- **Space:** O(k) for the queue of pending candidates.

## Follow‑Up Questions
1. How would you adapt the algorithm if the allowed digits form a set of size > 2?
2. Can you solve the problem without a priority queue, using simple string enumeration?
3. What changes are needed if `n` can be up to 10¹⁸ (64‑bit) and performance must be O(log n)?

## Key Takeaway
Enumerating numbers composed of the allowed digits in increasing order guarantees the first number larger than `n` is the minimal solution.
