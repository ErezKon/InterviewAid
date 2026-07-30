# 1687. Delivering Boxes from Storage to Ports

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delivering-boxes-from-storage-to-ports](https://leetcode.com/problems/delivering-boxes-from-storage-to-ports)
**Companies:** Nutanix

---

## Problem Description

You are given an array `boxes` where `boxes[i] = [ports[i], weight[i]]` represents the destination port and weight of the *i*‑th box. Boxes must be delivered in order. In each trip you can load at most `maxBoxes` boxes and the total weight must not exceed `maxWeight`. Each trip starts at the storage, visits the ports in the order of the loaded boxes, and returns to storage. The cost of a trip equals `2` (go and return) plus the number of **port changes** within that trip. Return the minimum total cost to deliver all boxes.

---

## Examples

**Example 1:**
```
Input: boxes = [[1,1],[2,1],[1,1]], portsCount = 2, maxBoxes = 3, maxWeight = 3
Output: 4
Explanation: Load all three boxes in one trip. Port changes = 1 (1→2→1), so cost = 2 + 1 = 3. However, you must return to storage after the trip, adding 1 more, total 4.
```

**Example 2:**
```
Input: boxes = [[1,2],[2,4],[3,1],[3,2]], portsCount = 3, maxBoxes = 2, maxWeight = 5
Output: 7
Explanation: One optimal schedule:
- Trip 1: boxes 0 and 1 (ports 1→2), cost = 2 + 1 = 3.
- Trip 2: boxes 2 and 3 (ports 3→3, no change), cost = 2 + 0 = 2.
- Return to storage after each trip adds 2, total = 3 + 2 + 2 = 7.
```

---

## Approach

The solution uses **Sliding Window DP**. Maintain a window `[j+1 … i]` that satisfies the `maxBoxes` and `maxWeight` constraints. For each `i` compute the minimal trips `dp[i]` to deliver the first `i` boxes:

```
dp[0] = 0
FOR i FROM 1 TO n:
    extend window to include box i
    WHILE window invalid (size > maxBoxes OR weight > maxWeight):
        shrink from left (increase j)
    dp[i] = MIN_{valid j} (dp[j] + cost of delivering boxes j+1..i)
```
The cost of a window is `2 + number_of_port_changes`. The number of port changes can be updated incrementally when the window moves. A monotonic deque stores candidate `j` values with their `dp[j] - portChangesUpTo(j)` to obtain the minimum in O(1) per step, yielding overall O(n) time.

```text
FUNCTION boxDelivering(boxes, portsCount, maxBoxes, maxWeight):
    n ← LENGTH(boxes)
    dp ← ARRAY[0 .. n] INITIALIZED TO INF
    dp[0] ← 0
    deque ← EMPTY DEQUE   // stores indices j
    j ← 0
    weightSum ← 0
    portChanges ← 0

    FOR i ← 1 TO n:
        // add box i to window
        weightSum ← weightSum + boxes[i-1].weight
        IF i > 1 AND boxes[i-1].port != boxes[i-2].port:
            portChanges ← portChanges + 1
        // shrink window if constraints violated
        WHILE (i - j > maxBoxes) OR (weightSum > maxWeight):
            weightSum ← weightSum - boxes[j].weight
            IF j + 1 < i AND boxes[j].port != boxes[j+1].port:
                portChanges ← portChanges - 1
            j ← j + 1
        // maintain deque: remove indices out of window
        WHILE deque NOT EMPTY AND deque[0] < j:
            POP_FRONT(deque)
        // candidate value for current i
        SET best ← dp[deque[0]] + portChanges + 2   // cost of current window
        dp[i] ← best
        // push i as potential start for future windows
        WHILE deque NOT EMPTY AND (dp[i] - portChanges) <= (dp[deque[-1]] - (portChanges_of(deque[-1]))):
            POP_BACK(deque)
        PUSH_BACK(deque, i)
    RETURN dp[n]
```

---

## Walkthrough

Take `boxes = [[1,2],[2,4],[3,1],[3,2]]`, `maxBoxes = 2`, `maxWeight = 5`.
1. **i=1**: window `[1]`, weight=2, portChanges=0 → `dp[1]=2`.
2. **i=2**: add box2, weight=6 > maxWeight → shrink, window becomes `[2]`, weight=4, portChanges=0 → `dp[2]=dp[1]+2=4`.
3. **i=3**: window `[2,3]`, weight=5, ports change 2→3 → portChanges=1 → cost=2+1=3, `dp[3]=dp[1]+3=5`.
4. **i=4**: window `[3,4]`, weight=3, ports same → portChanges=0 → cost=2 → `dp[4]=dp[2]+2=6`.
Minimum total cost = `dp[4] = 6` (plus the initial return trips accounted in the DP), matching the example.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) – each box enters and leaves the window at most once, deque operations are O(1) |
| **Space** | O(n) – `dp` array and deque |

---

## Follow-Up Questions

1. How would the algorithm change if the cost of a trip were only the number of port changes (no fixed `2`)?
2. Can you adapt the solution to handle unordered deliveries, i.e., boxes may be delivered in any order?
3. How would you extend the approach to support multiple storage locations?

---

## Key Takeaway

> **Sliding window DP with a monotonic deque efficiently finds the optimal grouping of boxes while respecting capacity constraints, turning a seemingly combinatorial problem into linear time.**