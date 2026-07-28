# 3191. Minimum Operations to Make Binary Array Elements Equal to One I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i](https://leetcode.com/problems/minimum-operations-to-make-binary-array-elements-equal-to-one-i)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Problem Description
Given a binary array `nums`, you may perform an operation that flips (0↔1) three consecutive elements starting at index `i` (i.e., `nums[i]`, `nums[i+1]`, `nums[i+2]`). Determine the minimum number of operations required to make the last two elements of the array equal to `1`. If it is impossible, return `-1`.

Constraints: `3 ≤ nums.length ≤ 10⁵`, each `nums[i]` is `0` or `1`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[0,0,0,1,1]` | `1` | Flip starting at index 0 changes the first three bits to `1,1,1`; the last two are already `1`.
| `[0,1,0,0,1]` | `-1` | No sequence of flips can make both final bits `1` simultaneously.
| `[1,1,1,1,1]` | `0` | Already satisfies the condition.

## Approach
The operation only affects a sliding window of size 3. A greedy left‑to‑right scan works: whenever we encounter a `0` at position `i` (where `i ≤ n‑3`), we must flip the window starting at `i` because later operations cannot affect `nums[i]`. This ensures the earliest possible correction and yields the minimum number of flips.

**Algorithm**
1. Initialise `ops = 0`.
2. Iterate `i` from `0` to `n‑3`:
   - If `nums[i] == 0`, flip `nums[i]`, `nums[i+1]`, `nums[i+2]` and increment `ops`.
3. After the loop, check the last two elements; if both are `1`, return `ops`, else `-1`.

**Pseudocode**
```text
FUNCTION minOperations(nums):
    SET ops ← 0
    SET n ← LENGTH(nums)
    FOR i ← 0 TO n - 3:
        IF nums[i] = 0:
            // flip three consecutive bits
            SET nums[i] ← 1 - nums[i]
            SET nums[i+1] ← 1 - nums[i+1]
            SET nums[i+2] ← 1 - nums[i+2]
            SET ops ← ops + 1
    IF nums[n-2] = 1 AND nums[n-1] = 1:
        RETURN ops
    ELSE:
        RETURN -1
```

## Walkthrough
Example `nums = [0,0,0,1,1]`:
| i | nums before | Action | nums after | ops |
|---|-------------|--------|------------|-----|
|0|[0,0,0,1,1]|flip at 0|[1,1,1,1,1]|1|
Loop ends. Last two are `1,1` → return `1`.

## Complexity Analysis
- **Time:** `O(n)` – single pass.
- **Space:** `O(1)` – in‑place modifications.

## Follow-Up Questions
1. How would the solution change if the operation flipped exactly two consecutive bits?
2. Can you extend the algorithm to return the actual sequence of flip indices?
3. What if the target pattern for the last `k` bits is configurable?

## Key Takeaway
A left‑to‑right greedy scan that flips whenever a `0` is encountered yields the minimal number of three‑bit flips needed to satisfy the final‑two‑bits condition.
