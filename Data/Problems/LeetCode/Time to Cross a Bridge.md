# 2532. Time to Cross a Bridge

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/time-to-cross-a-bridge](https://leetcode.com/problems/time-to-cross-a-bridge)
**Companies:** Linkedin

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve the classic "bridge and torch" puzzle, a different problem. Correct idea: event simulation with four heaps — `waitLeft`/`waitRight` (max-heaps by inefficiency) and `workLeft`/`workRight` (min-heaps by finish time). At each step release finished workers into the wait heaps; if a right-side worker waits, they cross left (answer candidate when the last box returns); else if boxes remain and a left-side worker waits, they cross right; otherwise jump time to the next finish. O(n log k).*

There are `k` workers who want to move `n` boxes from the right (old) warehouse to the left (new) warehouse. You are given the two integers `n` and `k`, and a 2D integer array `time` of size `k x 4` where `time[i] = [right_i, pick_i, left_i, put_i]`.

The warehouses are separated by a river and connected by a bridge. Initially, all `k` workers are waiting on the left side of the bridge. To move the boxes, the `i`th worker can do the following:

- Cross the bridge to the right side in `right_i` minutes.
- Pick a box from the right warehouse in `pick_i` minutes.
- Cross the bridge to the left side in `left_i` minutes.
- Put the box into the left warehouse in `put_i` minutes.

The `i`th worker is **less efficient** than the `j`th worker if either condition is met:

- `left_i + right_i > left_j + right_j`
- `left_i + right_i == left_j + right_j` and `i > j`

The following rules regulate the movement of the workers through the bridge:

- Only one worker can use the bridge at a time.
- When the bridge is unused prioritize the **least efficient** worker (who have picked up the box) on the right side to cross. If not, prioritize the **least efficient** worker on the left side to cross.
- If enough workers have already been dispatched from the left side to pick up all the remaining boxes, **no more** workers will be sent from the left side.

Return the **elapsed minutes** at which the last box reaches the **left side of the bridge**.

**Constraints:**
- `1 <= n, k <= 10^4`
- `time.length == k`
- `time[i].length == 4`
- `1 <= left_i, pick_i, right_i, put_i <= 1000`

## Examples

**Example 1:**
```
Input: n = 1, k = 3, time = [[1,1,2,1],[1,1,3,1],[1,1,4,1]]
Output: 6
Explanation:
From 0 to 1 minutes: worker 2 crosses the bridge to the right.
From 1 to 2 minutes: worker 2 picks up a box from the right warehouse.
From 2 to 6 minutes: worker 2 crosses the bridge to the left.
From 6 to 7 minutes: worker 2 puts a box at the left warehouse.
The whole process ends after 7 minutes. We return 6 because the problem asks for the instance of time at which the last worker reaches the left side of the bridge.
```

**Example 2:**
```
Input: n = 3, k = 2, time = [[1,5,1,8],[10,10,10,10]]
Output: 37
Explanation: The last box reaches the left side at 37 seconds. Notice, how we do not put the last boxes down, as that would take more time, and they are already on the left with the workers.
```

## Approach
Two classic strategies for the fastest‑slowest problem:
1. **Strategy A** – Send the two fastest across, fastest returns, two slowest cross, second fastest returns.
2. **Strategy B** – Send fastest with slowest, fastest returns, fastest with second slowest, fastest returns.
Choose the cheaper of the two at each step until ≤3 people remain, then handle the base cases directly.

```text
FUNCTION minCrossTime(times):
    SORT times ASCENDING
    SET total ← 0
    WHILE LENGTH(times) > 3:
        SET a ← times[0]   // fastest
        SET b ← times[1]   // second fastest
        SET y ← times[-2]  // second slowest
        SET z ← times[-1]  // slowest
        // cost of two possible patterns
        SET costA ← a + 2*b + z   // a+b cross, a back, y+z cross, b back
        SET costB ← 2*a + y + z   // a+z cross, a back, a+y cross, a back
        SET total ← total + MIN(costA, costB)
        REMOVE last two elements from times  // y and z are now crossed
    // handle remaining 1‑3 people
    IF LENGTH(times) = 3:
        SET total ← total + times[0] + times[1] + times[2]
    ELSE IF LENGTH(times) = 2:
        SET total ← total + times[1]
    ELSE IF LENGTH(times) = 1:
        SET total ← total + times[0]
    RETURN total
```

## Walkthrough
For `[1,2,5,10]` (sorted):
| Step | Action | Cost added |
|------|--------|------------|
| 1 | Strategy A (cheaper) → 1+2 cross (2), 1 back (1), 5+10 cross (10), 2 back (2) | 15 |
| 2 | Remaining `[1,2]` → cross together (2) | 2 |
Total = 17 minutes.

## Complexity Analysis
*Time*: `O(n log n)` for sorting; the loop is linear.
*Space*: `O(1)` beyond the input array.

## Follow‑Up Questions
1. How would the solution change if more than two people could cross together?
2. What if each crossing incurs a fixed overhead time in addition to the slowest person's time?
3. Can you output the exact sequence of moves achieving the minimum time?

## Key Takeaway
Sorting the times and repeatedly applying the cheaper of two shuttle patterns yields the optimal bridge‑crossing schedule.
