# 1687. Delivering Boxes from Storage to Ports

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delivering-boxes-from-storage-to-ports](https://leetcode.com/problems/delivering-boxes-from-storage-to-ports)
**Companies:** Nutanix

---

## Problem Description

You have the task of delivering some boxes from storage to their ports using only one ship. However, this ship has a **limit** on the **number of boxes** and the **total weight** that it can carry.

You are given an array `boxes`, where `boxes[i] = [ports_i, weight_i]`, and three integers `portsCount`, `maxBoxes`, and `maxWeight`.

- `ports_i` is the port where you need to deliver the `i`<sup>th</sup> box and `weights_i` is the weight of the `i`<sup>th</sup> box.
- `portsCount` is the number of ports.
- `maxBoxes` and `maxWeight` are the respective box and weight limits of the ship.

The boxes need to be delivered **in the order they are given**. The ship will follow these steps:

- The ship will take some number of boxes from the `boxes` queue, not violating the `maxBoxes` and `maxWeight` constraints.
- For each loaded box **in order**, the ship will make a **trip** to the port the box needs to be delivered to and deliver it. If the ship is already at the correct port, no **trip** is needed, and the box can immediately be delivered.
- The ship then makes a return **trip** to storage to take more boxes from the queue.

The ship must end at storage after all the boxes have been delivered.

Return *the **minimum** number of **trips** the ship needs to make to deliver all boxes to their respective ports.*

**Constraints:**

- `1 <= boxes.length <= 10^5`
- `1 <= portsCount, maxBoxes, maxWeight <= 10^5`
- `1 <= ports_i <= portsCount`
- `1 <= weights_i <= maxWeight`

---

## Examples

```
Example 1:
  Input: boxes = [[1,1],[2,1],[1,1]], portsCount = 2, maxBoxes = 3, maxWeight = 3
  Output: 4
  Explanation: The optimal strategy is as follows:
  - The ship takes all the boxes in the queue, goes to port 1, then port 2, then port 1 again, then returns to storage. 4 trips.
  So the total number of trips is 4.
  Note that the first and third boxes cannot be delivered together because the boxes need to be delivered
  in order (i.e. the second box needs to be delivered at port 2 before the third box).
```

```
Example 2:
  Input: boxes = [[1,2],[3,3],[3,1],[3,1],[2,4]], portsCount = 3, maxBoxes = 3, maxWeight = 6
  Output: 6
  Explanation: The optimal strategy is as follows:
  - The ship takes the first box, goes to port 1, then returns to storage. 2 trips.
  - The ship takes the second, third and fourth boxes, goes to port 3, then returns to storage. 2 trips.
  - The ship takes the fifth box, goes to port 2, then returns to storage. 2 trips.
  So the total number of trips is 2 + 2 + 2 = 6.
```

```
Example 3:
  Input: boxes = [[1,4],[1,2],[2,1],[2,1],[3,2],[3,4]], portsCount = 3, maxBoxes = 6, maxWeight = 7
  Output: 6
  Explanation: The optimal strategy is as follows:
  - The ship takes the first and second boxes, goes to port 1, then returns to storage. 2 trips.
  - The ship takes the third and fourth boxes, goes to port 2, then returns to storage. 2 trips.
  - The ship takes the fifth and sixth boxes, goes to port 3, then returns to storage. 2 trips.
  So the total number of trips is 2 + 2 + 2 = 6.
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