import { Avatar, AvatarBadge, Text, VStack } from "@chakra-ui/react"
type ProfileType = {
    username?: string
}
export const Profile = ({username}:ProfileType) => {
    return (<>
        <VStack>
            <Avatar>
                <AvatarBadge boxSize='1.25em' bg='green.500' />
            </Avatar>
            <Text>{username}</Text>
        </VStack>
    </>)
}