import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";

import { useIssuesData, useSearchUrl } from "../../stores";
import { IssueType } from "../../types";
import { formatDate } from "../../utils";

const STORAGE_KEY_PREFIX = "kanban_issues_";

const KanbanList = () => {
  const [issues, setIssues] = useState<{ [key: string]: IssueType[] }>({
    todo: [],
    inProgress: [],
    done: [],
  });

  const { issuesData } = useIssuesData();
  const { searchUrl } = useSearchUrl();

  useEffect(() => {
    const storedIssues = localStorage.getItem(
      `${STORAGE_KEY_PREFIX}${searchUrl}`
    );
    if (storedIssues) {
      setIssues(JSON.parse(storedIssues));
    } else {
      initializeIssues();
    }
  }, [issuesData]);

  const initializeIssues = () => {
    setIssues({
      todo: issuesData.filter((issue: IssueType) => issue.state === "open"),
      inProgress: issuesData.filter(
        (issue: IssueType) => issue.state === "inProgress"
      ),
      done: issuesData.filter((issue: IssueType) => issue.state === "closed"),
    });
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const updatedIssues = { ...issues };
    const sourceList = issues[source.droppableId];
    const destinationList = issues[destination.droppableId];

    if (source.droppableId === destination.droppableId) {
      const [removed] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, removed);
    } else {
      const [moved] = sourceList.splice(source.index, 1);
      destinationList.splice(destination.index, 0, moved);
    }

    setIssues(updatedIssues);
    localStorage.setItem(
      `${STORAGE_KEY_PREFIX}${searchUrl}`,
      JSON.stringify(updatedIssues)
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Grid w="100%" my="20px" p={6} templateColumns="repeat(3, 1fr)" gap={6}>
        {Object.entries(issues).map(([status, issuesList]) => (
          <GridItem key={status} bgColor="gray.300" p={2}>
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
                            <Text
                              fontWeight="600"
                              fontSize="16px"
                              maxWidth="350px"
                            >
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
