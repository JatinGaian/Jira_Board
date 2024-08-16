import React from 'react'
import css from './MembersDetails.module.scss'
import MemberIcon from '../../../../assets/MIB/MemberIcon'

const MembersDetails = (props) => {
    return (
        <div className={css.mainContainer}>
            {props?.data ?  <span style={{ background: props?.data?.bgColor }}>
                {props?.data?.cardName}
            </span> : <span style={{ background: props?.data ? props?.data?.bgColor : "#4BADE8" }}>
                    {`${props?.projectData?.project_lead?.split("")[0]}${props?.projectData?.project_lead?.split("")[1]}`}
            </span>}
            {/* <MemberIcon fill={props?.data?.bgColor} strokeColor="grey" /> */}
            <div className={css.details}>
                {props?.data ? <p>{props?.data?.fullName}</p> : <p>
                    {
                        props.projectData?.project_key
                    }
                </p>}
                {props?.data ? <p>{props?.data?.emailAddress}</p> : <p>
                    {
                        `${props?.membersLength} ${props?.membersLength > 1 ? "members" : "member"}`
                    }
                </p>}
            </div>
            {props?.projectData ?
                <p>
                {props?.projectData?.project_lead}
                </p> :
                <p>team A</p>}

        </div>
    )
}

export default MembersDetails