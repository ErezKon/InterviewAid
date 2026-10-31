# 2532. Time to Cross a Bridge

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/time-to-cross-a-bridge](https://leetcode.com/problems/time-to-cross-a-bridge)
**Companies:** Linkedin

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

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
Event-driven simulation with four heaps:
1. **waitLeft / waitRight** - workers standing at the bridge on each side, ordered so the **least efficient** worker is on top (max-heap by `(left_i + right_i, i)`).
2. **workLeft / workRight** - workers busy putting / picking a box, ordered by the time they finish (min-heap by `finishTime`).

At current time `cur`: move every worker whose task has finished (`finishTime <= cur`) into the corresponding wait heap. Then use the bridge:
- If someone waits on the right, the least efficient one crosses left (`cur += left_i`). If no boxes remain to be dispatched and nobody else is on the right side, `cur` is the answer. Otherwise they start putting (`workLeft` until `cur + put_i`).
- Else, if boxes remain (`n > 0`) and someone waits on the left, the least efficient one crosses right (`cur += right_i`, `n -= 1`) and starts picking (`workRight` until `cur + pick_i`).
- Else nobody can move: jump `cur` to the earliest finish time in the work heaps.

Decrementing `n` when a worker is *dispatched* enforces "no more workers once enough are sent for the remaining boxes".

```text
FUNCTION findCrossingTime(n, k, time):
    SET waitLeft ← MAX-HEAP of (left_i + right_i, i) for all workers
    SET waitRight, workLeft, workRight ← empty heaps
    SET cur ← 0
    LOOP:
        WHILE workLeft NOT EMPTY AND workLeft.TOP.finish <= cur:
            MOVE worker from workLeft TO waitLeft
        WHILE workRight NOT EMPTY AND workRight.TOP.finish <= cur:
            MOVE worker from workRight TO waitRight
        IF waitRight NOT EMPTY:
            SET i ← POP(waitRight)
            SET cur ← cur + left_i
            IF n = 0 AND waitRight IS EMPTY AND workRight IS EMPTY:
                RETURN cur
            PUSH (cur + put_i, i) TO workLeft
        ELSE IF n > 0 AND waitLeft NOT EMPTY:
            SET i ← POP(waitLeft)
            SET cur ← cur + right_i
            SET n ← n - 1
            PUSH (cur + pick_i, i) TO workRight
        ELSE:
            SET cur ← MIN(workLeft.TOP.finish, workRight.TOP.finish)   // over non-empty heaps
```

## Walkthrough
Example 2: `n = 3, k = 2, time = [[1,5,1,8],[10,10,10,10]]`. Efficiency sums: worker 0 -> 2, worker 1 -> 20, so worker 1 is the least efficient.

| cur | Event | Bridge action | cur after | n left |
|---|---|---|---|---|
| 0 | waitLeft = {0, 1} | W1 crosses right, picks until 30 | 10 | 2 |
| 10 | waitLeft = {0} | W0 crosses right, picks until 16 | 11 | 1 |
| 11 | nobody waiting | jump to 16 | 16 | 1 |
| 16 | W0 done picking | W0 crosses left, puts until 25 | 17 | 1 |
| 17 | nobody waiting | jump to min(25, 20) = 20 | 20 | 1 |
| 20 | W1 done picking | W1 crosses left, puts until 40 | 30 | 1 |
| 30 | W0 done putting | W0 crosses right, picks until 36 | 31 | 0 |
| 31 | nobody waiting | jump to 36 | 36 | 0 |
| 36 | W0 done picking | W0 crosses left; n = 0 and right side empty -> return | **37** | 0 |

Result: `37`, matching the expected output.

## Complexity Analysis
*Time*: `O(n log k)` - each box causes a constant number of heap pushes/pops (two crossings, two tasks), each `O(log k)`.
*Space*: `O(k)` for the four heaps.

## Follow-Up Questions
1. How would the simulation change if the bridge could hold two workers at once, in the same direction?
2. What if the priority rule favored the **most** efficient worker instead - which heap keys change?
3. How would you also return the time when the last box is **put** into the left warehouse?

## Key Takeaway
For multi-agent timing problems with a shared resource, separate agents into "waiting" heaps (ordered by priority rule) and "working" heaps (ordered by finish time), and advance time event by event, jumping over idle gaps.
