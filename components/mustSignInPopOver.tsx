import { Popover, Grid, Button, Row, Text } from "@nextui-org/react";
import SignIn from "./signIn";
import { AiOutlineStar } from 'react-icons/ai';

export default function MustSigninPopOver(){
    return (
        <Grid.Container gap={2} alignContent="center">
            <Grid>
                <Popover>
                    <Popover.Trigger>
                        <Button light><AiOutlineStar size={50}/></Button>
                    </Popover.Trigger>
                    <Popover.Content>
                        <Grid.Container css={{ borderRadius: "14px", padding: "0.75rem", maxWidth: "330px" }}>
                        <Row>
                            <Text>
                                You must be signed in to add books to your favorites.
                            </Text>
                        </Row>
                            <SignIn />
                        </Grid.Container>
                    </Popover.Content>
                </Popover>
            </Grid>
        </Grid.Container>
    );
}