# BFS Level-Order Patterns

Related: #102, #103, #107, #199, #515, #637, #993

---

| Problem | What to Track Per Level |
|---------|----------------------|
| Level Order (#102) | All values |
| Zigzag (#103) | All values, alternate direction |
| Bottom-Up (#107) | All values, reverse at end |
| Right Side View (#199) | Last node per level |
| Largest Value (#515) | Max per level |
| Average (#637) | Sum and count per level |
| Cousins (#993) | Parent and depth |

### Template

```
queue = [root]
WHILE queue:
    levelSize = len(queue)
    levelData = []
    FOR i ← 0 TO levelSize - 1:
        node = queue.DEQUEUE()
        // process node for this level
        IF node.left: queue.ENQUEUE(node.left)
        IF node.right: queue.ENQUEUE(node.right)
    // aggregate levelData
```
