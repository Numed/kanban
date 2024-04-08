import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";

import { useIssuesData } from "../../stores";
import { IssueType } from "../../types";
import { formatDate } from "../../utils";

const KanbanList = () => {
  const { issuesData } = useIssuesData();
  const [issues, setIssues] = useState<{ [key: string]: IssueType[] }>({
    todo: [],
    inProgress: [],
    done: [],
  });

  useEffect(() => {
    setIssues({
      todo: issuesData.filter((issue: IssueType) => issue.state === "open"),
      inProgress: issuesData.filter(
        (issue: IssueType) => issue.state === "inProgress"
      ),
      done: issuesData.filter((issue: IssueType) => issue.state === "closed"),
    });
  }, [issuesData]);

  const onDragEnd = (result: any) => {
    console.log(result);
    const { source, destination } = result;

    if (
      !destination ||
      !issues[source.droppableId] ||
      !issues[destination.droppableId]
    ) {
      return;
    }

    const sourceItems = Array.from(issues[source.droppableId]);
    const destinationItems = Array.from(issues[destination.droppableId]);
    const [movedItem] = sourceItems.splice(source.index, 1);
    destinationItems.splice(destination.index, 0, movedItem);

    setIssues({
      ...issues,
      [source.droppableId]: sourceItems,
      [destination.droppableId]: destinationItems,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid w="100%" my="20px" p={6} templateColumns="repeat(3, 1fr)" gap={6}>
        {Object.entries(issues).map(([status, issuesList]) => (
          <GridItem key={status} bgColor="gray.300" p={4}>
            <Text textAlign="center" fontWeight="600" mb="15px" fontSize="18px">
              {status}
            </Text>
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {issuesList.map((issue: IssueType, index: number) => (
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id}
                      index={index}
                      isDragDisabled={false}
                    >
                      {(provided) => (
                        <Box
                          p="10px"
                          bg="white"
                          borderRadius="md"
                          mb="10px"
                          borderColor="gray.200"
                          borderWidth="1px"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Box>
                            <Text fontWeight="600" fontSize="16px">
                              {issue.title}
                            </Text>
                            <Text fontSize="16px">
                              #{issue.number} opened{" "}
                              {formatDate(issue.created_at)}
                            </Text>
                            <Text fontSize="16px">
                              {issue.author} | Comments: {issue.comments}
                            </Text>
                          </Box>
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </GridItem>
        ))}
      </Grid>
    </DragDropContext>
  );
};

export default KanbanList;