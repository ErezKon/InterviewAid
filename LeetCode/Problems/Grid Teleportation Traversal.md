# 3552. Grid Teleportation Traversal

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Meta, Visa
---

## 1. Problem Description

Find shortest path in a grid where same-letter cells can teleport to each other for free. Moving to adjacent cells costs 1.

## 2. Approach: 0-1 BFS ✅

```
FUNCTION gridTeleportation(grid):
    // Group cells by letter
    // 0-1 BFS: adjacent moves cost 1, teleport to same letter costs 0
    // Use deque: push front for cost-0 edges, push back for cost-1 edges
    // After processing a letter group, clear it to avoid revisiting
```

## Key Takeaway

> **0-1 BFS** with deque. Teleportation = 0-cost edge, movement = 1-cost edge. Clear letter groups after first use to stay O(n·m).
