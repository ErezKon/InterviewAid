# 1514. Path with Maximum Probability

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-with-maximum-probability](https://leetcode.com/problems/path-with-maximum-probability)
**Companies:** Amazon, Google, Meta, Microsoft, Samsung

---

## Approach: Dijkstra (Max Probability) — O(E log V) ✅

```
FUNCTION maxProbability(n, edges, succProb, start, end):
    graph = adjacency list with probabilities
    prob = [0.0] * n
    prob[start] = 1.0
    heap = [(-1.0, start)]    // max-heap via negation

    WHILE heap:
        (negP, node) = heap.POP()
        p = -negP
        IF node == end: RETURN p
        IF p < prob[node]: CONTINUE

        FOR (neighbor, edgeProb) IN graph[node]:
            newP = p * edgeProb
            IF newP > prob[neighbor]:
                prob[neighbor] = newP
                heap.PUSH((-newP, neighbor))

    RETURN 0.0
```
